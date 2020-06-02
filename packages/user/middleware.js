import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'INIT_USER':
      if (
        typeof window !== 'undefined' &&
        typeof window.bufferData !== 'undefined' &&
        typeof window.bufferData.user !== 'undefined' &&
        window.bufferData.user
      ) {
        dispatch(
          dataFetchActions.fetchSuccess({
            name: 'user',
            result: { ...window.bufferData.user },
          })
        );
        // make sure we only bootstrap this data once
        window.bufferData.user = undefined;
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
