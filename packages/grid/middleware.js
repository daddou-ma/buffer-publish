import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { trackAction } from '@bufferapp/publish-data-tracking';
import { actionTypes as gridActionTypes } from './reducer';
import { isValidURL, getBaseURL } from './util';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'gridPosts',
        args: {
          profileId: action.profile.id,
        },
      }));
      break;

    case `gridPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(dataFetchActions.fetch({
        name: 'shortenUrl',
        args: {
          profileId: action.args.profileId,
          url: `${getBaseURL()}/p/${action.args.profileId}`,
        },
      }));
      break;

    case gridActionTypes.COPY_TO_CLIPBOARD_RESULT:
      if (action.copySuccess) {
        dispatch(notificationActions.createNotification({
          notificationType: 'success',
          message: 'Copied!',
        }));
      } else {
        dispatch(notificationActions.createNotification({
          notificationType: 'error',
          message: 'Error copying to your clipboard!',
        }));
      }
      break;

    case gridActionTypes.SAVE_POST_URL:
      if (action.link) {
        if (isValidURL(action.link)) {
          dispatch(dataFetchActions.fetch({
            name: 'updatePostLink',
            args: {
              updateId: action.updateId,
              link: action.link,
            },
          }));
        } else {
          dispatch(notificationActions.createNotification({
            notificationType: 'error',
            message: 'The URL format is invalid!',
          }));
        }
      } else {
        dispatch(dataFetchActions.fetch({
          name: 'updatePostLink',
          args: {
            updateId: action.updateId,
            link: action.link,
          },
        }));
      }
      break;

    case `updatePostLink_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.result && action.result.success) {
        trackAction({ location: 'grid', action: 'updated_grid_post_url' });
        dispatch(notificationActions.createNotification({
          notificationType: 'success',
          message: 'Nice! Your changes have been saved.',
        }));
      } else {
        dispatch(notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error saving your changes!',
        }));
      }
      break;

    case `updatePostLink_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: 'There was an error saving your changes!',
      }));
      break;
    default:
      break;
  }
};
