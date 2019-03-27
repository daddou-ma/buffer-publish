import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes as gridActionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'servicePosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
          gridView: true,
        },
      }));
      break;

    case `servicePosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(dataFetchActions.fetch({
        name: 'pendingPosts',
        args: {
          profileId: action.args.profileId,
          isFetchingMore: false,
        },
      }));
      break;

    case gridActionTypes.COPY_TO_CLIPBOARD_RESULT:
      if (action.copySuccess) {
        dispatch(notificationActions.createNotification({
          notificationType: 'success',
          message: 'Generated URL copied to your clipboard!',
        }));
      } else {
        dispatch(notificationActions.createNotification({
          notificationType: 'error',
          message: 'Error copying generated URL copied to your clipboard!',
        }));
      }
      break;
    default:
      break;
  }
};
