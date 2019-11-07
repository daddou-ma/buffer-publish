import { push } from 'connected-react-router';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';

import { actionTypes, actions } from './reducer';

export default ({ getState, dispatch }) => next => action => {
  next(action);
  const { selectedProfileId } = getState().profileSidebar;
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
    case draftActionTypes.DRAFT_CREATED: {
      if (selectedProfileId === action.profileId) {
        dispatch(
          actions.updateCounter({
            needsApproval: action.draft.needsApproval,
            draftAction: 'draftCreated',
          })
        );
      }
      break;
    }

    case draftActionTypes.DRAFT_DELETED:
    case draftActionTypes.DRAFT_UPDATED:
    case draftActionTypes.DRAFT_APPROVED: {
      console.log('tabMiddleware', selectedProfileId, action);
      break;
    }

    default:
      break;
  }
};
