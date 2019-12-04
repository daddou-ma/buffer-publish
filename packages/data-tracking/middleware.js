import { createMiddleware as createBufferMetricsMiddleware } from '@bufferapp/buffermetrics/redux';
import { application } from './config';

/**
 * Returns metadata for a given action which is passed along to the redux middleware.
 * (See `bufferMetricsMiddleware` below)
 *
 * @param {Object} state The current state
 * @param {Object} action The action
 */
const getMetricsMetadata = (state, action) => {
  const metadata = {
    userId: state.appSidebar.user.id,
    profileId: state.profileSidebar.selectedProfileId,
  };
  // Add Instagram Tracking Data
  const isInstagramAction =
    action === 'OPEN_IG_MODAL' ||
    action === 'HIDE_IG_MODAL' ||
    action === 'SET_DIRECT_POSTING';
  if (isInstagramAction && state.queue.isBusinessOnInstagram) {
    metadata.isBusinessOnInstagram = state.queue.isBusinessOnInstagram
      ? 'true'
      : 'false';
  }
  return metadata;
};

export const logActionToConsole = (
  fromAutoTracking,
  location,
  action,
  metadata
) => {
  // User has to type `showTracking()` in the console to enable
  if (!window._showTracking) {
    return;
  }

  const actionString = `${application} ${location} ${action}`;
  // eslint-disable-next-line
  console.log(`[buffermetrics] ${actionString.toLowerCase()}`, metadata);
};

/**
 * Redux middleware for logging tracked actions to the browse console, when enabled.
 * (See attach-to-console.js)
 */
export const logTrackingMiddleware = ({ getState }) => next => action => {
  next(action);

  const segments = action.type.split('__');
  const location = segments[0];
  action = segments[1];

  if (!action) {
    return;
  }

  const metadata = getMetricsMetadata(getState(), action);
  logActionToConsole(true, location, action, metadata);
};

/**
 * Redux middleware for automatically logging redux actions
 * See: https://github.com/bufferapp/buffer-js-buffermetrics#redux
 */
export const bufferMetricsMiddleware = createBufferMetricsMiddleware({
  application,
  metadata: getMetricsMetadata,
});
