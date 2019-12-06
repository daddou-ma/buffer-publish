import buffermetrics from '@bufferapp/buffermetrics/client';
import { application } from './config';
import { logActionToConsole } from './middleware';

/**
 * Pulling the User ID from the window global feels wrong,
 * but events can be triggered immediately on load, so we
 * need something reliable like this.
 */
const userId = window._user ? window._user.id : '';

const trackAction = ({ location, action, metadata }, callbacks) => {
  const composedMetadata = { userId, ...metadata };
  logActionToConsole(false, location, action, composedMetadata);

  buffermetrics.trackAction(
    {
      application,
      location,
      action,
      metadata: composedMetadata,
    },
    callbacks
  );
};

export default trackAction;
