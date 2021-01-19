import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

export default (state = {}, action) => {
  switch (action.type) {
    case `globalAccount_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        email: action.result.email,
        _id: action.result._id,
        productSolutionName: action.result.productSolutionName,
        featureFlips: action.result.featureFlips || [],
      };
    default:
      return state;
  }
};
