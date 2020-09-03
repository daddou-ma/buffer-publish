import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

import BoundaryFallback from './errorComponent';
import FittedFallbackComponent from './fallbackComponent';
import SimpleErrorBoundary from './simpleErrorBoundary';

const BUGSNAG_KEY = '6d235b284e8baf3c8d669a1991844969';

/**
 * Setup Bugsnag
 * https://docs.bugsnag.com/platforms/javascript/react/#installation
 */
window.bugsnagClient = bugsnag({
  apiKey: BUGSNAG_KEY,
  releaseStage: process.env.BUGSNAG_RELEASE_STAGE,
  appVersion: process.env.BUGSNAG_APP_VERSION,
  appType: 'frontend',
  // user: userId
  //   ? {
  //       id: userId,
  //       adminLink: `https://buffer.com/admin/user/${userId}`,
  //     }
  //   : null,
});
window.bugsnagClient.use(bugsnagReact, React);

const BugsnagErrorBoundary = window.bugsnagClient.getPlugin('react');

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
