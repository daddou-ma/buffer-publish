import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals/reducer';

export const actionTypes = keyWrapper('STEAL_PROFILE_MODAL', {});

export const initialState = {
  showStealProfileModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case modalsActionTypes.SHOW_STEAL_PROFILE_MODAL:
      return {
        ...state,
        showStealProfileModal: true,
        stealProfileUsername: action.stealProfileUsername,
      };
    case modalsActionTypes.HIDE_STEAL_PROFILE_MODAL:
      return {
        ...state,
        showStealProfileModal: false,
      };
    default:
      return state;
  }
};

export const actions = {};
