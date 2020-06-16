export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'APP_INIT':
      dispatch({ type: 'INIT_MODALS' });
      dispatch({ type: 'INIT_USER' });
      dispatch({ type: 'INIT_APPSHELL' });
      dispatch({ type: 'INIT_FEATURES' });
      dispatch({ type: 'INIT_PUSHER' });
      dispatch({ type: 'INIT_CHECK_BOOKMARKLET' });
      dispatch({ type: 'INIT_STRIPE_DETAILS' });
      dispatch({ type: 'INIT_ORGANIZATIONS' });
      dispatch({ type: 'INIT_PROFILES' });
      break;
    default:
      break;
  }
};
