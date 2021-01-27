import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

const initialState = {
  shouldRedirectToAccountChannels: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `globalAccount_${asyncDataFetchActionTypes.FETCH_SUCCESS}`: {
      const featureFlips = action.result.featureFlips || [];
      return {
        ...state,
        email: action.result.email,
        _id: action.result._id,
        productSolutionName: action.result.productSolutionName,
        shouldRedirectToAccountChannels: featureFlips.includes(
          'sharedChannels'
        ),
      };
    }
    default:
      return state;
  }
};
