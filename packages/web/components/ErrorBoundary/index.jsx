import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

import BoundaryFallback from './errorComponent';
import FittedFallbackComponent from './fallbackComponent';
import SimpleErrorBoundary from './simpleErrorBoundary';

let BugsnagErrorBoundary;

/**
 * Setup Bugsnag
 * https://docs.bugsnag.com/platforms/javascript/react/#installation
 */
if (window._bugsnagConfig) {
  window.bugsnagClient = bugsnag({
    // Grab the config dropped in by the express server
    ...window._bugsnagConfig,
    // Remove FullStory integration for now (request from Super, Feb 6 2019)
    //     beforeSend: (report) => {
    //       // Make sure FullStory object exists
    //       if (window.FS && window.FS.getCurrentSessionURL) {
    //         report.updateMetaData(
    //           'fullstory', { urlAtTime: window.FS.getCurrentSessionURL(true) }
    //         );
    //       }
    //     },
  });
  window.bugsnagClient.use(bugsnagReact, React);

  BugsnagErrorBoundary = window.bugsnagClient.getPlugin('react');
}

const getErrorBoundary = (fit = false) => {
  if (BugsnagErrorBoundary) {
    return (
      { children, fallbackComponent } // eslint-disable-line
    ) => (
      <BugsnagErrorBoundary
        FallbackComponent={
          fallbackComponent || fit ? FittedFallbackComponent : BoundaryFallback
        }
      >
        {children}
      </BugsnagErrorBoundary>
    );
  }
  return (
    { children, fallbackComponent } // eslint-disable-line
  ) => (
    <SimpleErrorBoundary
      fallbackComponent={fallbackComponent}
      defaultFallbackComponent={
        fit ? FittedFallbackComponent : BoundaryFallback
      }
    >
      {children}
    </SimpleErrorBoundary>
  );
};

export default getErrorBoundary;
