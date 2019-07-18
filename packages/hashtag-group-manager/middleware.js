import { actionTypes } from './reducer';

export default () => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.CANCEL_HASHTAG_GROUP:
      //
      break;
    case actionTypes.SAVE_HASHTAG_GROUP:
      //
      break;
    default:
      break;
  }
};
