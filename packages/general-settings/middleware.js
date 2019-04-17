import { getURL } from '@bufferapp/publish-formatters';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actions as notificationActions } from '@bufferapp/notifications';
import {
  actions as asyncDataFetch,
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.SET_DIRECT_POSTING:
      window.location = getURL.getInstagramDirectPostingURL(action.profileId);
      break;
    case actionTypes.CONNECT_BITLY:
      window.location = getURL.getConnectBitlyURL(action.profileId);
      break;
    case actionTypes.DISCONNECT_BITLY:
      window.location = getURL.getDisconnectBitlyURL(action.profileId);
      break;
    case profileActionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'getLinkShortener',
        args: {
          profileId: action.profile.id,
        },
      }));
      break;
    case actionTypes.CHANGE_SELECTED_LINK_SHORTENER:
      dispatch(asyncDataFetch.fetch({
        name: 'changeLinkShortener',
        args: {
          profileId: action.profileId,
          domain: action.domain,
        },
      }));
      break;
    case actionTypes.TOGGLE_GOOGLE_ANALYTICS:
      dispatch(asyncDataFetch.fetch({
        name: 'toggleGoogleAnalytics',
        args: {
          profileId: action.profileId,
          utmTrackingChoice: action.utmTrackingChoice,
        },
      }));
      break;
    case actionTypes.SHOW_GA_CUSTOMIZATION_FORM:
      dispatch(asyncDataFetch.fetch({
        name: 'getGATrackingSettings',
        args: {
          profileId: action.profileId,
        },
      }));
      break;
    case `saveGATrackingSettings_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.result.showNotification) {
        dispatch(notificationActions.createNotification({
          notificationType: 'success',
          message: action.result.message,
        }));
      }
      break;
    case actionTypes.SAVE_GA_CUSTOM_FORM:
      dispatch(asyncDataFetch.fetch({
        name: 'saveGATrackingSettings',
        args: {
          profileId: action.profileId,
          utmCampaign: action.utmCampaign,
          utmSource: action.utmSource,
          utmMedium: action.utmMedium,
        },
      }));
      break;
    case actionTypes.TOGGLE_INSTAGRAM_REMINDERS:
      dispatch(dataFetchActions.fetch({
        name: 'toggleInstagramReminders',
        args: {
          profileId: action.profileId,
          allowReminders: action.allowReminders,
        },
      }));
      break;
    case actionTypes.SHUFFLE_QUEUE: {
      const state = getState();
      const postsObj = state.queue.byProfileId[action.profileId];
      const count = Object.keys(postsObj.posts).length;
      // only shuffle posts if more than 1
      if (postsObj && postsObj.posts && count > 1) {
        dispatch(dataFetchActions.fetch({
          name: 'shufflePosts',
          args: {
            profileId: action.profileId,
            count,
          },
        }));
      }
      break;
    }
    default:
      break;
  }
};
