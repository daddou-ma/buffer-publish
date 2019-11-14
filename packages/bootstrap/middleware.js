import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      if (
        typeof window !== 'undefined' &&
        typeof window.bufferUser !== 'undefined' &&
        window.bufferUser
      ) {
        dispatch(
          dataFetchActions.fetchSuccess({
            name: 'user',
            result: { ...window.bufferUser },
          })
        );
        // make sure we only bootstrap this data once
        window.bufferUser = undefined;
      } else {
        dispatch(
          dataFetchActions.fetch({
            name: 'user',
          })
        );
      }
      break;
    default:
      break;
  }
};
