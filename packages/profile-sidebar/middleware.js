import { push } from 'react-router-redux';
import { getURL } from '@bufferapp/publish-formatters';
import getNotificationMessage from '@bufferapp/publish-notifications-provider';

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

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case 'APP_INIT': {
      dispatch(dataFetchActions.fetch({
        name: 'profiles',
      }));
      break;
    }
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
        dispatch(actions.selectProfile({
          profile: profiles.find(profile => profile.id === params.profileId),
        }));
      } else if (!isPreferencePage && profiles.length > 0) {
        const selectedProfile = profiles[0];
        dispatch(actions.selectProfile({
          profile: selectedProfile,
        }));
        dispatch(push(generateProfilePageRoute({
          profileId: selectedProfile.id,
          tabId: 'queue',
        })));
      } else if (!isPreferencePage && profiles.length === 0) {
        dispatch(push('/new-connection'));
      }

      if (window._notification) {
        const notificationType = window._notification.type;

        const message = getNotificationMessage(
          notificationType,
          window._notification.key,
          window._notification.variable,
        );

        if (message) {
          dispatch(notificationActions.createNotification({
            notificationType,
            message,
          }));
        }
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
    case actionTypes.CONNECT_SOCIAL_ACCOUNT:
      window.location = getURL.getManageSocialAccountURL();
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
          },
        }));
      }
      break;
    default:
      break;
  }
};
