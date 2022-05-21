import {PublicClientApplication} from "@azure/msal-browser";
import axios from 'axios';


const AuthClient = ()=>{

    // const ENTER_WEB_API_CLIENT_ID = "aae5fddf-5f97-4bfe-ba2a-81b474e2cb5e"
    const TENANT_INFO = "81162fc5-b32d-49ab-8b39-5956f269f357"
    const CLIENT_ID = "aae5fddf-5f97-4bfe-ba2a-81b474e2cb5e"
    const API = "https://strapiareit.azurewebsites.net/api/auth/local"
    //const API = "http://localhost:1337/api/auth/local"
    const SCOPES = [`api://dev.artisreit.net/aae5fddf-5f97-4bfe-ba2a-81b474e2cb5e`]

    /**
     * Configuration object to be passed to MSAL instance on creation. 
     * For a full list of MSAL.js configuration parameters, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
     */
    const msalConfig = {
        auth: {
            clientId: `${CLIENT_ID}`,
            authority: `https://login.microsoftonline.com/${TENANT_INFO}`,
            redirectUri: "/",
        },
        cache: {
            cacheLocation: "localStorage", // This configures where your cache will be stored
            storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
        },
    };

    // Add here the endpoints and scopes for the web API you would like to use.
    const apiConfig = {
        uri: `${API}`, // e.g. http://localhost:5000/api
        scopes: SCOPES // e.g. ["scp1", "scp2"]
    };

    /**
     * Scopes you add here will be prompted for user consent during sign-in.
     * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
     * For more information about OIDC scopes, visit: 
     * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
     */
    const loginRequest = {
        scopes: ["openid", "profile"]
    };

    /**
     * Scopes you add here will be used to request a token from Azure AD to be used for accessing a protected resource.
     * To learn more about how to work with scopes and resources, see: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
     */
    // const tokenRequest = {
    //     scopes: [...apiConfig.scopes],
    // };

    // Create the main myMSALObj instance
    // configuration parameters are located at authConfig.js
    const myMSALObj = new PublicClientApplication(msalConfig);

    const result ={
        signIn: signIn,
        signOut: signOut,
        api: api,
        response: null
    }

    // const A_response_example = {
    //      "authority": "https://login.microsoftonline.com/86311f94-5e8c-4209-8693-51c003d5112e/",
    //      "uniqueId": "8daccd75-073e-45c0-9a4a-de160c836f36",
    //      "tenantId": "86311f94-5e8c-4209-8693-51c003d5112e",
    //      "scopes": [
    //          "openid",
    //          "profile",
    //          "email"
    //      ],
    //      "account": {
    //          "homeAccountId": "00000000-0000-0000-5f0d-81c2227118d5.9188040d-6c67-4c5b-b112-36a304b66dad",
    //          "environment": "login.windows.net",
    //          "tenantId": "86311f94-5e8c-4209-8693-51c003d5112e",
    //          "username": "cc861010@gmail.com",
    //          "localAccountId": "8daccd75-073e-45c0-9a4a-de160c836f36",
    //          "name": "肉肉 陈",
    //          "idTokenClaims": {
    //          "aud": "c4c81f60-345c-4b42-bd71-99677b746c36",
    //          "iss": "https://login.microsoftonline.com/86311f94-5e8c-4209-8693-51c003d5112e/v2.0",
    //          "iat": 1650301658,
    //          "nbf": 1650301658,
    //          "exp": 1650305558,
    //          "aio": "AYQAe/8TAAAAjtG6kgWfAVXIyguWWOb/etQnyjtuw4et8xA1giD25SLLU2xUzF/VjjTSCidB8TiUPD8LHtSLWQ7PPfspYJlKeFAp4NqnwBO2/dkDh/QEv/n46UiK/jLrkSvW06oKho10cnWHJyNloL5y/gzZ54zNTzAIR2PcdYo0/O1iwV58xko=",
    //          "idp": "https://sts.windows.net/9188040d-6c67-4c5b-b112-36a304b66dad/",
    //          "name": "肉肉 陈",
    //          "nonce": "0e00954e-4de5-48b7-8196-7823fece7a72",
    //          "oid": "8daccd75-073e-45c0-9a4a-de160c836f36",
    //          "preferred_username": "cc861010@gmail.com",
    //          "rh": "0.AUYAlB8xhoxeCUKGk1HAA9URLmAfyMRcNEJLvXGZZ3t0bDaAAH0.",
    //          "sub": "66i5nVOe4PtxPOwtXIlyoLHMDOe9WI12XsqwkanOK9k",
    //          "tid": "86311f94-5e8c-4209-8693-51c003d5112e",
    //          "uti": "IOVbfV1p2Ua9HSjJB-YBAA",
    //          "ver": "2.0"
    //          }
    //      },
    //      "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJjNGM4MWY2MC0zNDVjLTRiNDItYmQ3MS05OTY3N2I3NDZjMzYiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vODYzMTFmOTQtNWU4Yy00MjA5LTg2OTMtNTFjMDAzZDUxMTJlL3YyLjAiLCJpYXQiOjE2NTAzMDE2NTgsIm5iZiI6MTY1MDMwMTY1OCwiZXhwIjoxNjUwMzA1NTU4LCJhaW8iOiJBWVFBZS84VEFBQUFqdEc2a2dXZkFWWEl5Z3VXV09iL2V0UW55anR1dzRldDh4QTFnaUQyNVNMTFUyeFV6Ri9WampUU0NpZEI4VGlVUEQ4TEh0U0xXUTdQUGZzcFlKbEtlRkFwNE5xbndCTzIvZGtEaC9RRXYvbjQ2VWlLL2pMcmtTdlcwNm9LaG8xMGNuV0hKeU5sb0w1eS9nelo1NHpOVHpBSVIyUGNkWW8wL08xaXdWNTh4a289IiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkLyIsIm5hbWUiOiLogonogokg6ZmIIiwibm9uY2UiOiIwZTAwOTU0ZS00ZGU1LTQ4YjctODE5Ni03ODIzZmVjZTdhNzIiLCJvaWQiOiI4ZGFjY2Q3NS0wNzNlLTQ1YzAtOWE0YS1kZTE2MGM4MzZmMzYiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJjYzg2MTAxMEBnbWFpbC5jb20iLCJyaCI6IjAuQVVZQWxCOHhob3hlQ1VLR2sxSEFBOVVSTG1BZnlNUmNORUpMdlhHWlozdDBiRGFBQUgwLiIsInN1YiI6IjY2aTVuVk9lNFB0eFBPd3RYSWx5b0xITURPZTlXSTEyWHNxd2thbk9LOWsiLCJ0aWQiOiI4NjMxMWY5NC01ZThjLTQyMDktODY5My01MWMwMDNkNTExMmUiLCJ1dGkiOiJJT1ZiZlYxcDJVYTlIU2pKQi1ZQkFBIiwidmVyIjoiMi4wIn0.NUUVhqkMXFnCT2mPUMiTRNXVs_kXkMtOzzD9oEJDbgMwsC-tIt4buprvezsrXKbBYFYHiRuSpIMAM_zO_rPytZGEn0EEtG0nnS2EkHkcVweyK3SFboUq86eeD1SbXgxyg6mdP3MfIEQrg_HRX9J68CdbbFwyv3wI7lZ7G9q_viy-GpIjfpEb7_rY24Jc8yJAeTJSDk8muY_dI-jk0HnPLaTGGMl5_LVmaBlrigH4g1S6EsKuzqJiuEx2iieMFVIvezLRLCqTbDBHVTZJpn0idPZLSqLwTe07l3m_0_pWqvdUoZX9-Ym8qM5Lz97u6Wr3mTQVkT8-LdkZsuGWZLraNg",
    //      "idTokenClaims": {
    //          "aud": "c4c81f60-345c-4b42-bd71-99677b746c36",
    //          "iss": "https://login.microsoftonline.com/86311f94-5e8c-4209-8693-51c003d5112e/v2.0",
    //          "iat": 1650301658,
    //          "nbf": 1650301658,
    //          "exp": 1650305558,
    //          "aio": "AYQAe/8TAAAAjtG6kgWfAVXIyguWWOb/etQnyjtuw4et8xA1giD25SLLU2xUzF/VjjTSCidB8TiUPD8LHtSLWQ7PPfspYJlKeFAp4NqnwBO2/dkDh/QEv/n46UiK/jLrkSvW06oKho10cnWHJyNloL5y/gzZ54zNTzAIR2PcdYo0/O1iwV58xko=",
    //          "idp": "https://sts.windows.net/9188040d-6c67-4c5b-b112-36a304b66dad/",
    //          "name": "肉肉 陈",
    //          "nonce": "0e00954e-4de5-48b7-8196-7823fece7a72",
    //          "oid": "8daccd75-073e-45c0-9a4a-de160c836f36",
    //          "preferred_username": "cc861010@gmail.com",
    //          "rh": "0.AUYAlB8xhoxeCUKGk1HAA9URLmAfyMRcNEJLvXGZZ3t0bDaAAH0.",
    //          "sub": "66i5nVOe4PtxPOwtXIlyoLHMDOe9WI12XsqwkanOK9k",
    //          "tid": "86311f94-5e8c-4209-8693-51c003d5112e",
    //          "uti": "IOVbfV1p2Ua9HSjJB-YBAA",
    //          "ver": "2.0"
    //      },
    //      "accessToken": "eyJ0eXAiOiJKV1QiLCJub25jZSI6IlpJelRnSDRSWTEtWFU4aFNnX20xNVJCQ0JKSEwzU05OZjZNN3A4azJkRHMiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NjMxMWY5NC01ZThjLTQyMDktODY5My01MWMwMDNkNTExMmUvIiwiaWF0IjoxNjUwMzAxNjU4LCJuYmYiOjE2NTAzMDE2NTgsImV4cCI6MTY1MDMwNzI3OCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFXUUFtLzhUQUFBQVVqOWJwdVl1aE9LeUtnQWNMRXp2a016bVdTYmdxcm40bjVjYSt4U0xIRXQ2YStTUlEzUmtIMTBrZERSSmhxVm1wNUJFcHZvT1FVNGtGb0tEVTJNZ3FlUjltQitZM3JwTWpNblVCNllHV1RTN2tDWWU0SHZlYmtPRjRrYXVhL09oIiwiYWx0c2VjaWQiOiIxOmxpdmUuY29tOjAwMDMwMDAwQUFGNjdBMDQiLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcF9kaXNwbGF5bmFtZSI6ImFwaV9jbGllbnQiLCJhcHBpZCI6ImM0YzgxZjYwLTM0NWMtNGI0Mi1iZDcxLTk5Njc3Yjc0NmMzNiIsImFwcGlkYWNyIjoiMCIsImVtYWlsIjoiY2M4NjEwMTBAZ21haWwuY29tIiwiZmFtaWx5X25hbWUiOiLpmYgiLCJnaXZlbl9uYW1lIjoi6IKJ6IKJIiwiaWRwIjoibGl2ZS5jb20iLCJpZHR5cCI6InVzZXIiLCJpcGFkZHIiOiI2NC4xNDEuMjcuMTY1IiwibmFtZSI6IuiCieiCiSDpmYgiLCJvaWQiOiI4ZGFjY2Q3NS0wNzNlLTQ1YzAtOWE0YS1kZTE2MGM4MzZmMzYiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDFDRjE0QzA4RiIsInJoIjoiMC5BVVlBbEI4eGhveGVDVUtHazFIQUE5VVJMZ01BQUFBQUFBQUF3QUFBQUFBQUFBQ0FBSDAuIiwic2NwIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJwa3N1N2hfTEZCdWdiMWFVWlpXN1c5VjdTVTZGdVpRTjc3ZkFWNHNwNW0wIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik5BIiwidGlkIjoiODYzMTFmOTQtNWU4Yy00MjA5LTg2OTMtNTFjMDAzZDUxMTJlIiwidW5pcXVlX25hbWUiOiJsaXZlLmNvbSNjYzg2MTAxMEBnbWFpbC5jb20iLCJ1dGkiOiJJT1ZiZlYxcDJVYTlIU2pKQi1ZQkFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyI2MmU5MDM5NC02OWY1LTQyMzctOTE5MC0wMTIxNzcxNDVlMTAiLCJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXSwieG1zX3N0Ijp7InN1YiI6IjY2aTVuVk9lNFB0eFBPd3RYSWx5b0xITURPZTlXSTEyWHNxd2thbk9LOWsifSwieG1zX3RjZHQiOjE2NDI0NjczOTh9.dE8-534RBHEg0O49Hj1CPkY8xg-3ZZjABG_m5fxcIvLOtli9umhq3JoHi9q4KGgnfK3lLrC_iFNzLutIRZouTvl2w12ikGytcHBjsbvMiJvEYVeagUscSDmomWsWtA7ELFqrP6uBgzor1BtH-y1jKzLugAYfQ6hZeOPDP0LfsA7lI0ljL7Kmni38v0c-JPuzVOJJPUR2qEwxxMFXHqLeSvgMtLlUTRMrptNNvegegIRi5n6Fo8srP_6lINa2S6iDHlFJ2SEBX-uk_MmQ9Frw4_oPbUqmiHcTN4AHqhr6HBgCOqc1eTRK1WY4h9YFawb35IArHGPehj2jbwM7bWeI4A",
    //      "fromCache": false,
    //      "expiresOn": "2022-04-18T18:41:21.000Z",
    //      "extExpiresOn": "2022-04-18T20:10:00.000Z",
    //      "familyId": "",
    //      "tokenType": "Bearer",
    //      "state": "",
    //      "cloudGraphHostName": "",
    //      "msGraphHost": ""
    //      }
    
    function signIn(){
        /**
         * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
         */
         return myMSALObj.loginPopup(loginRequest).then((res) => {
            //todo save to storage
            if (res !== null) {
                result.response = res
            }
            return result
        })
    }

    function signOut(){
        /**
         * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
         * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
         */
        // Choose which account to logout from by passing a username.
        const username = result.response.account.username;
        const logoutRequest = {
            account: myMSALObj.getAccountByUsername(username)
        };

        return myMSALObj.logout(logoutRequest).then(()=>{
            return result
        })
    }


    function callApi(endpoint, token) {
            return axios.post(endpoint, {
                // identifier: 'cc861010_gmail.com#EXT#@cc861010gmail.onmicrosoft.com',
                authType: 'web',
            },{
                headers: {
                    "authorization": `Bearer ${token}`,
                }
            })
            .then(response => {
                return response.data;
            }).catch(error => {
                return Promise.reject(error);
            });
    }

    function api() {
        if (result.response) {
            const response = result.response
            console.log("access_token acquired at: " + new Date().toString());
            try {
                return callApi(apiConfig.uri, response.accessToken);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        // const username = result.response.account.username;
        // tokenRequest.account = myMSALObj.getAccountByUsername(username);
        // return myMSALObj.acquireTokenSilent(tokenRequest)
        //     .catch(error => {
        //         console.warn(error);
        //         console.warn("silent token acquisition fails. acquiring token using popup");
        //         if (error instanceof InteractionRequiredAuthError) {
        //             // fallback to interaction when silent call fails
        //             return myMSALObj.acquireTokenPopup(tokenRequest)
        //                 .then(response => {
        //                     console.log(response);
        //                     return response;
        //                 }).catch(error => {
        //                     return Promise.reject(error);
        //                 });
        //         } else {
        //             console.warn(error);
        //         }
        //     }).then(response => {
        //         if (response) {
        //             console.log("access_token acquired at: " + new Date().toString());
        //             try {
        //                 return callApi(apiConfig.uri, response.accessToken);
        //             } catch (error) {
        //                 return Promise.reject(error);
        //             }
        //         }
        //     });
    }

    return   Promise.resolve(result)
}


let profile = null

const auth = ()=>{
    return AuthClient().then((client)=>{
        return client.signIn().then(()=>client)
    }).then((client)=>{
        return client.api()
    }).then((res)=>{
        return res
    })
}

const authFn = () => {
    if(profile === null){
        return auth().then((res)=>{
            profile = res
            return res
        })
    }else{
        return Promise.resolve(profile)
    }
}


export default authFn
