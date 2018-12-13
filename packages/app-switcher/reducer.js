import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';

export const actionTypes = {};

export const initialState = {
  redirecting: false,
  showGoBackToClassic: false,
  submittingFeedback: false,
  user: {
    loading: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        showGoBackToClassic: !action.result.hasNewPublish, // User is not in phased rollout - so they can switch
        user: {
          ...action.result,
          loading: false,
        },
      };
    case `sendFeedback_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        submittingFeedback: true,
      };
    case `sendFeedback_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        submittingFeedback: false,
        redirecting: true,
      };
    case `sendFeedback_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        submittingFeedback: false,
      };
    default:
      return state;
  }
};

export const actions = {
  sendFeedback: feedback =>
    dataFetchActions.fetch({ name: 'sendFeedback', args: { body: feedback } }),
};
