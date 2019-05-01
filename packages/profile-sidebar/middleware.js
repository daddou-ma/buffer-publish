import { push } from 'connected-react-router';
import { getURL } from '@bufferapp/publish-formatters';

import {
  generateProfilePageRoute,
  getProfilePageParams,
  getPreferencePageParams,
} from '@bufferapp/publish-routes';
import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';

import { actionTypes as initialLoadingActionTypes } from '@bufferapp/publish-initial-loading';

import { actions as notificationActions } from '@bufferapp/notifications';
import {
  actions,
  actionTypes,
} from './reducer';

const { formatAnalyticsProfileObj } = require('./analytics');

export const refreshProfile = (dispatch, profileId, message) => {
  dispatch(dataFetchActions.fetch({
    name: 'singleProfile',
    args: {
      profileId,
      message,
    },
  }));
};

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT': {
      dispatch(dataFetchActions.fetch({
        name: 'profiles',
      }));
      break;
    }
    case actionTypes.SINGLE_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'singleProfile',
        args: {
          profileId: action.profileId,
        },
      }));
      break;
    case `singleProfile_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.args.message) {
        dispatch(notificationActions.createNotification({
          notificationType: 'success',
          message: action.args.message,
        }));
      }
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case initialLoadingActionTypes.PROFILE_LOADING_REDIRECT: {
      const profilesLoaded = getState().profileSidebar.loading === false;
      if (!profilesLoaded) {
        break;
      }
      const path = getState().router.location.pathname;
      const params = getProfilePageParams({
        path,
      });
      const isPreferencePage = !!getPreferencePageParams({
        path,
      });
      const profiles = getState().profileSidebar.profiles;
      if (params && params.profileId) {
        const profile = [...profiles].find(p => p.id === params.profileId);

        dispatch(actions.selectProfile({
          profile,
        }));
        // Dispatch different select profile for components in analyze
        if (profile.isAnalyticsSupported) {
          dispatch({
            type: 'PROFILE_SELECTOR__SELECT_PROFILE',
            profile: formatAnalyticsProfileObj(profile),
          });
        }
      } else if (!isPreferencePage && profiles.length > 0) {
        const selectedProfile = profiles[0];
        dispatch(actions.selectProfile({
          profile: selectedProfile,
        }));
        // Dispatch to fetch analytics data if no params
        if (selectedProfile.isAnalyticsSupported) {
          dispatch({
            type: 'PROFILE_SELECTOR__SELECT_PROFILE',
            profile: formatAnalyticsProfileObj(selectedProfile),
          });
        }
        dispatch(push(generateProfilePageRoute({
          profileId: selectedProfile.id,
          tabId: 'queue',
        })));
      } else if (!isPreferencePage && profiles.length === 0) {
        dispatch(push('/new-connection'));
      }
      break;
    }

    case actionTypes.PROFILE_PAUSED:
    case actionTypes.PROFILE_UNPAUSED:
      dispatch(dataFetchActions.fetch({
        name: 'pauseQueue',
        args: {
          profileId: action.profileId,
          paused: action.type === actionTypes.PROFILE_PAUSED,
        },
      }));
      break;
    case actionTypes.MANAGE_SOCIAL_ACCOUNT:
      window.location = getURL.getManageSocialAccountURL();
      break;
    case actionTypes.CONNECT_SOCIAL_ACCOUNT:
      window.location = getURL.getConnectSocialAccountURL();
      break;
    case `pauseQueue_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: action.result.message,
      }));
      break;
    /**
     * When the buffer-web backend sends out it's paused state
     * message via Pusher let's reload the queue (only if it is now unpaused)
     */
    case actionTypes.PUSHER_PROFILE_PAUSED_STATE:
      if (!action.paused) {
        dispatch(dataFetchActions.fetch({
          name: 'queuedPosts',
          args: {
            profileId: action.profileId,
            isFetchingMore: false,
            count: 300,
          },
        }));
      }
      break;
    case actionTypes.PROFILE_DROPPED: {
      if (action.commit) {
        const state = getState();
        const profiles = state.profileSidebar.profiles;
        const orderedIds = profiles.map(profile => profile.id);
        dispatch(dataFetchActions.fetch({
          name: 'reorderProfiles',
          args: {
            order: orderedIds,
          },
        }));
      }
      break;
    }
    default:
      break;
  }
};
