import { push } from 'connected-react-router';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';

import { actionTypes } from './reducer';

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
    case draftActionTypes.DRAFT_CREATED:
    case draftActionTypes.DRAFT_DELETED:
    case draftActionTypes.DRAFT_UPDATED:
    case draftActionTypes.DRAFT_APPROVED: {
      const { profileId } = getState();
      console.log('tabMiddleware', profileId, action);
      break;
    }

    default:
      break;
  }
};
