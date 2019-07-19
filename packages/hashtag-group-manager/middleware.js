import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.CANCEL_HASHTAG_GROUP:
      //
      break;
    case actionTypes.SAVE_HASHTAG_GROUP:
      //
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(dataFetchActions.fetch({
        name: 'hashtagGroups',
        args: {},
      }));
      break;
    default:
      break;
  }
};
