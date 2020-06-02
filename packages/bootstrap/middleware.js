import { actionTypes as dataFetchActions } from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      dispatch({ type: 'INIT_MODALS' });
      dispatch({ type: 'INIT_USER' });
      dispatch({ type: 'INIT_ORGANIZATIONS' });
      dispatch({ type: 'INIT_APPSHELL' });
      dispatch({ type: 'INIT_FEATURES' });
      dispatch({ type: 'INIT_PUSHER' });
      dispatch({ type: 'INIT_CHECK_BOOKMARKLET' });
      dispatch({ type: 'INIT_STRIPE_DETAILS' });
      break;
    case 'ORGANIZATIONS_INITIALIZED': {
      dispatch({ type: 'INIT_PROFILES' });
      // setTimeout(() => {
      //   dispatch({
      //     type: 'SELECT_ORGANIZATION',
      //     id: '5e96e4a4bab7b824f655e7d4',
      //   });
      // }, 5000);
      break;
    }
    default:
      break;
  }
};
