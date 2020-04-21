import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions, actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.SET_USER_LANGUAGE:
      /*
      dispatch(
        dataFetchActions.fetch({
          name: 'setUserLanguage',
          args: {
            language: action.language,
          },
        })
      );
      */
      break;

    default:
      break;
  }
};
