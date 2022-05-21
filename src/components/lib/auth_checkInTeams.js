import * as microsoftTeams from "@microsoft/teams-js";

const checkInTeams = () => {
    // eslint-disable-next-line dot-notation
    const microsoftTeamsLib = microsoftTeams || window["microsoftTeams"];

    if (!microsoftTeamsLib) {
        return false; // the Microsoft Teams library is for some reason not loaded
    }

    if ((window.parent === window.self && window.nativeInterface) ||
        window.navigator.userAgent.includes("Teams/") ||
        window.name === "embedded-page-container" ||
        window.name === "extension-tab-frame") {
        return true;
    }
    return false;
};

export default checkInTeams