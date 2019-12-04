export default () => next => action => {
  next(action);
  switch (action.type) {
    default:
      break;
  }
};
