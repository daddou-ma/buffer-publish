import { actions as asyncDataFetch } from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'INIT_MODALS':
      dispatch(
        asyncDataFetch.fetch({
          name: 'clientAccess',
          args: {
            profileId: action.profileId,
          },
        })
      );
      break;
    default:
      break;
  }
};
