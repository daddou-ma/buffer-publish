import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
//
// export default (state = {}, action) => {
//   switch (action.type) {
//     case `globalAccount_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
//       return {
//         ...state,
//         ...action.result,
//       };
//     default:
//       return state;
//   }
// };


export const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `globalAccount_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...action.result,
      };
    default:
      return state;
  }
};
