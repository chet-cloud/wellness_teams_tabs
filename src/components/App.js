// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
import { 
  BrowserRouter as Router,
  Routes,
  Route
  // Switch 
} from "react-router-dom";
import React from 'react';
import { useTeamsFx } from "@microsoft/teamsfx-react";
import Privacy from "./Privacy";
import Tab from "./Tab";
import TabConfig from "./TabConfig";
import MainScreen from "./MainScreen";
import StreamScreen from './StreamScreen';
import { TeamsFxContext } from "./Context";
import "../scss/App.scss";
import withStartScreen from "./withStartScreen";
import PlaylistScreen from "./PlaylistScreen";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
function App() {
  const { loading, theme, themeString, teamsfx } = useTeamsFx();

  if(loading){
    return <Loader style={{ margin: 100 }} />
  }

  return (
    <TeamsFxContext.Provider value={{theme, themeString, teamsfx}}>
      <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
        <Router>
          <Routes>
            <Route exact path="/" element={<StreamScreen />} /> 
            <Route exact path="/privacy" element={<Privacy />} />
            <Route exact path="/tab" element={<Tab />} />
            <Route exact path="/config" element={<TabConfig />} />
            {/* Customize path */}
            <Route path="/home" exact element={<MainScreen />} />
            <Route path="/stream" element={<StreamScreen />} />
            <Route path="/list" element={<PlaylistScreen />} />
          </Routes>
        </Router>
      </Provider>
    </TeamsFxContext.Provider>
  );
}

export default withStartScreen(App);
