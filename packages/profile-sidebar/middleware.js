import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions, actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case `singleProfile_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.args.message) {
        dispatch(
          notificationActions.createNotification({
            notificationType: 'success',
            message: action.args.message,
          })
        );
      }
      break;

    case actionTypes.PROFILE_ROUTE_LOADED: {
      const { selectedProfile = {} } = action;
      let profile = selectedProfile;

      // force user redirection to valid profile if none exists
      if (!profile || !profile.id) {
        const { profileSidebar = {} } = getState();
        const { profiles } = profileSidebar;
        if (profiles && profiles.length > 0) {
          [profile] = profiles;
        }
      }

      dispatch(
        actions.selectProfile({
          profile,
        })
      );
      break;
    }

    case actionTypes.SELECT_PROFILE: {
      dispatch(
        dataFetchActions.fetch({
          name: 'getCounts',
          args: {
            profileId: action.profile.id,
          },
        })
      );
      break;
    }

    case actionTypes.PROFILE_PAUSED:
    case actionTypes.PROFILE_UNPAUSED:
      dispatch(
        dataFetchActions.fetch({
          name: 'pauseQueue',
          args: {
            profileId: action.profileId,
            paused: action.type === actionTypes.PROFILE_PAUSED,
          },
        })
      );
      break;
    case `pauseQueue_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: action.result.message,
        })
      );
      break;
    /**
     * When the buffer-web backend sends out it's paused state
     * message via Pusher let's reload the queue (only if it is now unpaused)
     */
    case actionTypes.PUSHER_PROFILE_PAUSED_STATE:
      if (!action.paused) {
        dispatch(
          dataFetchActions.fetch({
            name: 'queuedPosts',
            args: {
              profileId: action.profileId,
              isFetchingMore: false,
              count: 300,
            },
          })
        );
      }
      break;
    default:
      break;
  }
};
