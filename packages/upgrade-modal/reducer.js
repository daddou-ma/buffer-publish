import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals';

export const actionTypes = keyWrapper('UPGRADE_MODAL', {
  STORE_VALUE: 0,
  UPGRADE: 0,
  SELECT_CYCLE: 0,
});

export const initialState = {
  cycle: 'year',
  card: {},
  source: 'unknown',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_CYCLE:
      return {
        ...state,
        cycle: action.cycle,
      };
    case actionTypes.STORE_VALUE:
      return {
        ...state,
        card: {
          ...state.card,
          [action.id]: action.value,
        },
      };
    case modalsActionTypes.SHOW_UPGRADE_MODAL:
      return {
        ...state,
        source: action.source || 'unknown',
      };
    case modalsActionTypes.HIDE_UPGRADE_MODAL:
      return {
        ...state,
        source: initialState.source,
      };
    default:
      return state;
  }
};

export const actions = {
  storeValue: (id, value) => ({
    type: actionTypes.STORE_VALUE,
    id,
    value,
  }),
  upgrade: () => ({
    type: actionTypes.UPGRADE,
  }),
  selectCycle: cycle => ({
    type: actionTypes.SELECT_CYCLE,
    cycle,
  }),
};
