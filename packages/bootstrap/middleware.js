import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from '@bufferapp/async-data-fetch/src';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      // trigger user and profiles initialization
      dispatch({ type: 'USER_INIT' });
      dispatch({ type: 'PROFILES_INIT' });
      break;
    default:
      break;
  }
};
