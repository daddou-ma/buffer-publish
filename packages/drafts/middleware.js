import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'draftPosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
        },
      }));
      break;
    case actionTypes.DRAFT_CONFIRMED_DELETE:
      dispatch(dataFetchActions.fetch({
        name: 'deletePost',
        args: {
          updateId: action.updateId,
        },
      }));
      break;
/*
In Classic it's REQUESTING_DRAFT_APPROVE.
Sends draft to queue, which means approves draft
*/
    case actionTypes.DRAFT_APPROVE:
      dispatch(dataFetchActions.fetch({
        name: 'approveDraft',
        args: {
          updateId: action.updateId,
        },
      }));
      break;
/*
In Classic it's REQUESTING_NEEDS_APPROVAL_UPDATE:
Requests approval as a contributor (moves draft to awaiting approval tab if needsApproval is true,
moves from approval tab to drafts if needsApproval false)
*/
    case actionTypes.DRAFT_NEEDS_APPROVAL:
      dispatch(dataFetchActions.fetch({
        name: 'changeDraftStatus',
        args: {
          updateId: action.updateId,
          needsApproval: action.needsApproval,
        },
      }));
      break;
    case `approveDraft_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'We\'ve added this draft to your queue!',
      }));
      break;
    case `changeDraftStatus_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'We\'ve successfully moved this draft!',
      }));
      break;
    case `approveDraft_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: 'There was an error adding this draft to your queue!',
      }));
      break;
    case `changeDraftStatus_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: 'There was an error moving this draft!',
      }));
      break;
    default:
      break;
  }
};
