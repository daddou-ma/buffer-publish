import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

/**
 * Setup Bugsnag
 * https://docs.bugsnag.com/platforms/javascript/react/#installation
 */
const getErrorBoundary = () => {
  if (window._bugsnagConfig) {
    // Grab the config dropped in by the express server
    window.bugsnagClient = bugsnag(window._bugsnagConfig);
    window.bugsnagClient.use(bugsnagReact, React);
    return window.bugsnagClient.getPlugin('react');
  }
  return React.Fragment; // no-op component
};

export default getErrorBoundary;
