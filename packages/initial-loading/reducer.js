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
        result: { hasNewPublish, features = [] },
      } = action;
      return {
        loading: false,
        hasPublishBeta: features.includes('new_publish_beta'),
        hasPublishBetaRedirect: features.includes('new_publish_beta_redirect'),
        hasNewPublish,
      };
    }
    default:
      return state;
  }
};

export const actions = {};
