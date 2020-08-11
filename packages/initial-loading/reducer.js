import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = {};

const initialState = {
  hasPublishBeta: false,
  hasPublishBetaRedirect: false,
  hasNewPublish: false,
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const {
        result: { hasNewPublish, hasPublishBeta, hasPublishBetaRedirect },
      } = action;
      return {
        loading: false,
        hasPublishBeta,
        hasPublishBetaRedirect,
        hasNewPublish,
      };
    }
    default:
      return state;
  }
};

export const actions = {};
