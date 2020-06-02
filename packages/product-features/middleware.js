import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'INIT_FEATURES':
      dispatch(
        dataFetchActions.fetch({
          name: 'features',
        })
      );
      break;
    default:
      break;
  }
};
