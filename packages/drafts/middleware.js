import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
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
    default:
      break;
  }
};
