import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';

export const initialState = {
  closeComposerConfirmationModal: false,
};

export const actionTypes = keyWrapper('CLOSE_COMPOSER_CONFIRMATION_MODAL', {
  CLOSE_COMPOSER_AND_CONFIRMATION_MODAL: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CLOSE_COMPOSER_AND_CONFIRMATION_MODAL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export const actions = {
  closeComposerAndConfirmationModal: () => ({
    type: actionTypes.CLOSE_COMPOSER_AND_CONFIRMATION_MODAL,
  }),
};
