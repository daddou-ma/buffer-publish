import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('APPSWITCHER', {
  SHOW_FEEDBACK_MODAL: 0,
  HIDE_FEEDBACK_MODAL: 0,
});

export const initialState = {
  redirecting: false,
  showGoBackToClassic: false,
  submittingFeedback: false,
  showFeedbackModal: false,
  user: {
    loading: true,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        // User is not in phased rollout - so they can switch
        showGoBackToClassic: !action.result.hasNewPublish,
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
        redirecting: true,
      };
    case `sendFeedback_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        submittingFeedback: false,
      };
    case actionTypes.SHOW_FEEDBACK_MODAL:
      return {
        ...state,
        showFeedbackModal: true,
        source: action.source,
      };
    case actionTypes.HIDE_FEEDBACK_MODAL:
      return {
        ...state,
        showFeedbackModal: false,
      };
    default:
      return state;
  }
};

export const actions = {
  closeFeedbackModal: ({ source }) => ({
    type: actionTypes.HIDE_FEEDBACK_MODAL,
    source,
  }),
  displayFeedbackModal: ({ source }) => ({
    type: actionTypes.SHOW_FEEDBACK_MODAL,
    source,
  }),
  sendFeedback: ({ feedback, source }) =>
    dataFetchActions.fetch({
      name: 'sendFeedback',
      args: { body: feedback, source },
    }),
};
