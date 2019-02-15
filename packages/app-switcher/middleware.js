import { actionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { getURL } from '@bufferapp/publish-formatters';
import buffermetrics from '@bufferapp/buffermetrics/client';

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `sendFeedback_${actionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: 'Whoops, looks like we had some trouble sending your feedback, up for trying again?',
      }));
      break;
    case `sendFeedback_${actionTypes.FETCH_SUCCESS}`:
      if (action.args && action.args.source === 'publish_sidebar') {
        const state = getState();
        const metricsData = {
          application: 'PUBLISH',
          location: 'APPSWITCHER',
          action: 'SUBMIT_FEEDBACK_MODAL',
          metadata: {
            userId: state.appSidebar.user.id,
            profileId: state.profileSidebar.selectedProfileId,
            comments: action.args.body,
          },
        };
        buffermetrics.trackAction(metricsData, {
          success: () => {
            window.location = getURL.getBackToClassicNewPublishBufferURL();
          },
          error: () => {
            window.location = getURL.getBackToClassicNewPublishBufferURL();
          },
        });
      } else {
        window.location = getURL.getClassicBufferURL();
      }
      break;
    default:
      break;
  }
};
