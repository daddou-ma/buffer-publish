import { push } from 'connected-react-router';
import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as profileActions } from '@bufferapp/publish-profile-sidebar';

import {
  getPreferencePageParams,
  getPlansPageParams,
  newBusinessTrialistsRoute,
  newConnectionRoute,
  generateProfilePageRoute,
  getProfilePageParams,
} from '@bufferapp/publish-routes';

const getClassicBufferURL = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/app';
  }
  return 'https://buffer.com/app';
};

export default ({ getState, dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const {
        hasPublishBeta,
        hasPublishBetaRedirect,
        hasNewPublish,
        onPaydayPage,
      } = getState().initialLoading;
      if (!hasPublishBeta) {
        if (!hasNewPublish && !onPaydayPage) {
          window.location.replace(getClassicBufferURL());
        }
      } else if (!hasPublishBetaRedirect) {
        dispatch(dataFetchActions.fetch({ name: 'savePublishBetaRedirect' }));
      }
      break;
    }

    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { isOnBusinessTrial } = getState().appSidebar.user;
      const path = getState().router.location.pathname;
      const profiles = action.result;

      const params = getProfilePageParams({
        path,
      });

      const isPreferencePage = !!getPreferencePageParams({
        path,
      });
      const isPlansPage = !!getPlansPageParams({
        path,
      });

      let navigationAction = '';
      if (params && params.profileId) {
        navigationAction = 'navigateToDedicatedProfileRoute';
      } else if (isPreferencePage || isPlansPage) {
        navigationAction = 'keepPageRoute';
      } else if (profiles.length > 0) {
        navigationAction = 'navigateToDefaultProfileRoute';
      } else if (profiles.length === 0 && isOnBusinessTrial) {
        navigationAction = 'navigateToNewBusinessTrialistsRoute';
      } else if (profiles.length === 0) {
        navigationAction = 'navigateToDefaultPageRoute';
      }

      switch (navigationAction) {
        // Keeps dedicated route if user has profiles connected and there's a valid profileId and tabId in path
        // publish.buffer.com/profile/{profileId}/tab/{tabId}
        case 'navigateToDedicatedProfileRoute': {
          const profile = [...profiles].find(p => p.id === params.profileId);
          dispatch(
            profileActions.handleProfileRouteLoaded({
              selectedProfile: profile,
              tabId: params.tabId,
            })
          );
          break;
        }

        // Doesn't redirect if user is in special Pages
        // e.g. publish.com/preferences
        case 'keepPageRoute':
          break;

        // Redirects user with profiles connected to the queue, and selects first profile
        // publish.buffer.com/ or publish.buffer.com/{unknown}
        case 'navigateToDefaultProfileRoute': {
          const selectedProfile = profiles[0];
          dispatch(
            push(
              generateProfilePageRoute({
                profileId: selectedProfile.id,
                tabId: 'queue',
              })
            )
          );
          dispatch(
            profileActions.handleProfileRouteLoaded({
              selectedProfile,
              tabId: 'queue',
            })
          );
          break;
        }

        // Redirects business trialists with no profiles connected
        case 'navigateToNewBusinessTrialistsRoute':
          dispatch(push(newBusinessTrialistsRoute));
          break;

        // Redirects other users with no profiles connected
        case 'navigateToDefaultPageRoute':
          dispatch(push(newConnectionRoute));
          break;

        default:
          break;
      }
      break;
    }

    default:
      break;
  }
};
