// https://fluentsite.z22.web.core.windows.net/quick-start
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar";
import { HashRouter as Router, 
  Redirect, 
  Route, 
  // Switch 
} from "react-router-dom";
import React, { useState, useEffect } from 'react';
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

  return (
    <TeamsFxContext.Provider value={{theme, themeString, teamsfx}}>
      <Provider theme={theme || teamsTheme} styles={{ backgroundColor: "#eeeeee" }}>
        <Router>
          <Route exact path="/"> 
            <MainScreen />
          </Route>
          {loading ? (
            <Loader style={{ margin: 100 }} />
          ) : (
            <>
              <Route exact path="/privacy" component={Privacy} />
              <Route exact path="/tab" component={Tab} />
              <Route exact path="/config" component={TabConfig} />


              {/* Customize path */}
              <Route path="/home" exact component={MainScreen} />
              <Route path="/stream" component={StreamScreen} />
              <Route path="/list" component={PlaylistScreen} />
            </>
          )}
        </Router>
      </Provider>
      </TeamsFxContext.Provider>
  );
}

export default withStartScreen(App);
