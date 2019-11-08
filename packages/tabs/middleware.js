import { push } from 'connected-react-router';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';

import { actionTypes, actions } from './reducer';

export default ({ getState, dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_TAB:
      if (
        action.tabId !== getState().tabId ||
        action.profileId !== getState().profileId
      ) {
        dispatch(
          push(
            generateProfilePageRoute({
              profileId: action.profileId,
              tabId: action.tabId,
            })
          )
        );
      }
      break;

    // Drafts pusher events trigger a draft counter update action
    case draftActionTypes.DRAFT_CREATED:
    case draftActionTypes.DRAFT_DELETED:
    case draftActionTypes.DRAFT_APPROVED:
    case draftActionTypes.DRAFT_MOVED: {
      if (getState().profileSidebar.selectedProfileId === action.profileId) {
        dispatch(
          actions.updateDraftCounter({
            needsApproval: action.draft.needsApproval,
            draftAction: action.type,
          })
        );
      }
      break;
    }

    default:
      break;
  }
};
