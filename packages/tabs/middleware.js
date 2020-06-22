import { profileTabPages } from '@bufferapp/publish-routes';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

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
          profileTabPages.goTo({
            profileId: action.profileId,
            tabId: action.tabId,
          })
        );
      }
      break;

    case profileActionTypes.SELECT_PROFILE: {
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

    // Drafts pusher events trigger a draft counter update action
    case draftActionTypes.DRAFT_CREATED:
    case draftActionTypes.DRAFT_DELETED:
    case draftActionTypes.DRAFT_APPROVED:
    case draftActionTypes.DRAFT_MOVED: {
      if (getState().profileSidebar.selectedProfileId === action.profileId) {
        dispatch(
          dataFetchActions.fetch({
            name: 'getCounts',
            args: {
              profileId: action.profileId,
            },
          })
        );
      }
      break;
    }

    default:
      break;
  }
};
