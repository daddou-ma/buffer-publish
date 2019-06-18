import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('IG_FIRST_COMMENT_PRO_TRIAL_MODAL', {
  START_PRO_TRIAL: 0,
});

export default (state = { startedTrial: false }, action) => {
  switch (action.type) {
    case `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        startedTrial: true,
      };
    case `startTrial_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case `startTrial_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const actions = {
  handleStartProTrialClick: () => ({
    type: actionTypes.START_PRO_TRIAL,
  }),
};
