import { ApplicationInsights } from '@microsoft/applicationinsights-web'
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
// check out https://github.com/microsoft/ApplicationInsights-JS/tree/master/extensions/applicationinsights-react-js
export const AppInsights = new ApplicationInsights({ config: {
  instrumentationKey: '579f04e3-67bf-49b7-9fa5-47bfc30eef66',
  enableAutoRouteTracking: true,
  extensions: [ReactPlugin]
} });
AppInsights.loadAppInsights();
AppInsights.trackPageView(); 
