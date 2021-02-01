import { actionTypes } from './reducer';

export default () => next => action => {
  // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.ON_CLOSE_BANNER:
      // dispatch action to mark message on banner as read.
      break;
    default:
      break;
  }
};
