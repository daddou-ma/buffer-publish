import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('TRIAL', {
  START_PRO_TRIAL: 0,
  CLEAR_SCOPE: 0,
});

export default (state = { startedTrial: false }, action) => {
  switch (action.type) {
    case actionTypes.START_PRO_TRIAL:
      if (action.scope) {
        return {
          ...state,
          scope: action.scope,
        };
      }
      return state;
    case `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        startedTrial: true,
      };
    case actionTypes.CLEAR_SCOPE:
      return {
        ...state,
        scope: null,
      };
    default:
      return state;
  }
};

export const actions = {
  handleStartProTrial: ({ scope, cta }) => ({
    type: actionTypes.START_PRO_TRIAL,
    scope,
    cta,
  }),
};
