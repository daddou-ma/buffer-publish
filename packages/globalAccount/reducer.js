import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

const initialState = {
  isLoadingGlobalAccount: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `globalAccount_${asyncDataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        isLoadingGlobalAccount: true,
      };
    case `globalAccount_${asyncDataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        email: action.result.email,
        _id: action.result._id,
        productSolutionName: action.result.productSolutionName,
        isLoadingGlobalAccount: false,
      };
    }
    case `globalAccount_${asyncDataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isLoadingGlobalAccount: false,
      };
    default:
      return state;
  }
};
