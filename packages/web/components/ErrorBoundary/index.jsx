import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

import BoundaryFallback from './errorComponent';
import FittedFallbackComponent from './fallbackComponent';
import SimpleErrorBoundary from './simpleErrorBoundary';

/**
 * Setup Bugsnag
 * https://docs.bugsnag.com/platforms/javascript/react/#installation
 */
const getReleaseStage = () => {
  if (window.location.href.match(/local\.buffer/)) {
    return 'local';
  }
  if (window.location.href.match(/dev\.buffer/)) {
    return 'staging';
  }
  return 'production';
};

let BugsnagErrorBoundary;

if (process.env.NODE_ENV === 'production') {
  const BUGSNAG_KEY = '6d235b284e8baf3c8d669a1991844969';
  window.bugsnagClient = bugsnag({
    apiKey: BUGSNAG_KEY,
    releaseStage: getReleaseStage(),
    appVersion: process.env.BUGSNAG_APP_VERSION,
    appType: 'frontend',
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
