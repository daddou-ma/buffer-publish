import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actions as profilesActions } from '@bufferapp/publish-data-profiles/reducer';
import { actions as notificationActions } from '@bufferapp/notifications';
import {
  actions as asyncDataFetch,
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.CONNECT_BITLY:
      window.location = getURL.getConnectBitlyURL(action.profileId);
      break;
    case actionTypes.DISCONNECT_BITLY:
      window.location = getURL.getDisconnectBitlyURL(action.profileId);
      break;
    case profileActionTypes.SELECT_PROFILE:
      dispatch(
        dataFetchActions.fetch({
          name: 'getLinkShortener',
          args: {
            profileId: action.profile.id,
          },
        })
      );
      break;
    case actionTypes.CHANGE_SELECTED_LINK_SHORTENER:
      dispatch(
        asyncDataFetch.fetch({
          name: 'changeLinkShortener',
          args: {
            profileId: action.profileId,
            domain: action.domain,
          },
        })
      );
      break;
    case actionTypes.TOGGLE_GOOGLE_ANALYTICS:
      dispatch(
        asyncDataFetch.fetch({
          name: 'toggleGoogleAnalytics',
          args: {
            profileId: action.profileId,
            utmTrackingChoice: action.utmTrackingChoice,
          },
        })
      );
      break;
    case `toggleGoogleAnalytics_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        profilesActions.fetchSingleProfile({
          profileId: action.args.profileId,
        })
      );
      break;
    case actionTypes.SHOW_GA_CUSTOMIZATION_FORM:
      dispatch(
        asyncDataFetch.fetch({
          name: 'getGATrackingSettings',
          args: {
            profileId: action.profileId,
          },
        })
      );
      break;
    case `saveGATrackingSettings_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const message = action.result.showNotification
        ? action.result.message
        : null;
      dispatch(
        profilesActions.fetchSingleProfile({
          profileId: action.args.profileId,
          message,
        })
      );
      break;
    }
    case actionTypes.SAVE_GA_CUSTOM_FORM:
      dispatch(
        asyncDataFetch.fetch({
          name: 'saveGATrackingSettings',
          args: {
            profileId: action.profileId,
            utmCampaign: action.utmCampaign,
            utmSource: action.utmSource,
            utmMedium: action.utmMedium,
          },
        })
      );
      break;
    case actionTypes.TOGGLE_INSTAGRAM_REMINDERS:
      dispatch(
        dataFetchActions.fetch({
          name: 'toggleInstagramReminders',
          args: {
            profileId: action.profileId,
            allowReminders: action.allowReminders,
          },
        })
      );
      break;
    case actionTypes.CONFIRM_SHUFFLE_QUEUE: {
      const state = getState();
      const queueObj = state.queue.byProfileId[action.profileId];
      const count = Object.keys(queueObj.posts).length;
      dispatch(
        dataFetchActions.fetch({
          name: 'shuffleQueue',
          args: {
            profileId: action.profileId,
            count,
          },
        })
      );
      break;
    }
    case `shuffleQueue_${dataFetchActionTypes.FETCH_FAIL}`: {
      dispatch(
        notificationActions.createNotification({
          notificationType: 'fail',
          message:
            'Sorry! Something went wrong while shuffling your queue. Would you be up for trying again?',
        })
      );
      break;
    }
    case `shuffleQueue_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const message = 'Awesome! Your queue has been successfully shuffled.';
      dispatch(
        profilesActions.fetchSingleProfile({
          profileId: action.args.profileId,
          message,
        })
      );
      break;
    }
    case `toggleInstagramReminders_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        profilesActions.fetchSingleProfile({
          profileId: action.args.profileId,
        })
      );
      break;
    default:
      break;
  }
};
