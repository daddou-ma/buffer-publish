import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import { actionTypes } from './';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.OPEN_LINK:
      openBillingWindow();
      break;
    default:
      break;
  }
};
