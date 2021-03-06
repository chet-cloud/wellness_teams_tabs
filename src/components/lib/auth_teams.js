import * as microsoftTeams from "@microsoft/teams-js";

// // Add text to the display in a <p> or other HTML element
// function display_element(text, elementTag) {
//     var logDiv = document.getElementById('logs');
//     var p = document.createElement(elementTag ? elementTag : "p");
//     p.innerText = text;
//     logDiv.append(p);
//     console.log("ssoDemo: " + text);
//     return p;
// }

const API = "https://strapiareit.azurewebsites.net/api/auth/local"

const auth = (authURL, display) => {

    microsoftTeams.initialize();

    // 1. Get auth token
    // Ask Teams to get us a token from AAD
    function getClientSideToken() {

        return new Promise((resolve, reject) => {
            display("1. Get auth token from Microsoft Teams");
            microsoftTeams.authentication.getAuthToken({
                successCallback: (result) => {
                    display(result)
                    resolve(result);
                },
                failureCallback: function(error) {
                    reject("Error getting token: " + error);
                }
            });
        });
    }

    function callApi(endpoint, token) {

        const headers = new Headers();
        const bearer = `Bearer ${token}`;

        headers.append("authorization", bearer);

        const options = {
            method: "POST",
            headers: headers
        };

        //logMessage('Calling Web API...');

        return fetch(endpoint, options)
            .then(response => response.json())
            .then(response => {
                return response;
            }).catch(error => {
                return Promise.reject(error);
            });
    }
    // 2. Exchange that token for a token with the required permissions
    //    using the web service (see /auth/token handler in app.js)
    function getServerSideToken(clientSideToken) {
        return new Promise((resolve, reject) => {
            microsoftTeams.getContext((context) => {
                callApi(API, clientSideToken).then((res) => {
                    return resolve(res);
                }).catch(e=>reject(e))
            });
        });
    }

    // 3. Get the server side token and use it to call the Graph API
    function useServerSideToken(data) {
        display("2. Call https://graph.microsoft.com/v1.0/me/ with the server side token");
        display(JSON.stringify(data, undefined, 4), 'pre');
    }

    // Show the consent pop-up
    function requestConsent() {
        return new Promise((resolve, reject) => {
            microsoftTeams.authentication.authenticate({
                url: window.location.origin + "/auth-start.html",
                width: 600,
                height: 535,
                successCallback: (result) => {
                    let data = localStorage.getItem(result);
                    localStorage.removeItem(result);
                    resolve(data);
                },
                failureCallback: (reason) => {
                    reject(JSON.stringify(reason));
                }
            });
        });
    }

    // In-line code
    return getClientSideToken()
        .then((clientSideToken) => {
            return getServerSideToken(clientSideToken);
        })
        .then((profile) => {
             useServerSideToken(profile);
             return profile
        })
        .catch((error) => {
            if (error === "invalid_grant") {
                display(`Error: ${error} - user or admin consent required`);
                // Display in-line button so user can consent
                let button = display("Consent", "button");
                button.onclick = (() => {
                    requestConsent()
                        .then((result) => {
                            // Consent succeeded
                            display(`Consent succeeded`);

                            // offer to refresh the page
                            button.disabled = true;
                            let refreshButton = display("Refresh page", "button");
                            refreshButton.onclick = (() => {
                                window.location.reload();
                            });
                        })
                        .catch((error) => {
                            display(`ERROR ${error}`);
                            // Consent failed - offer to refresh the page
                            button.disabled = true;
                            let refreshButton = display("Refresh page", "button");
                            refreshButton.onclick = (() => {
                                window.location.reload();
                            });
                        });
                });
            } else {
                // Something else went wrong
                display(`Error from web service: ${error}`);
            }
        });

}

let profile = null

const authFn = () => {
    if(profile === null){
        return auth(API, () => {}).then((res)=>{
            profile = res
            return res
        })
    }else{
        return Promise.resolve(profile)
    }
}


export default authFn