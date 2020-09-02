import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'INIT_USER':
      dispatch(
        dataFetchActions.fetch({
          name: 'user',
        })
      );
      break;
    default:
      break;
  }
};
