export default store => next => action => {
  // eslint-disable-line no-unused-vars
  /* eslint-disable no-console */
  console.group();
  console.log('action', action);
  console.groupEnd();
  /* eslint-enable no-console */
  return next(action);
};
