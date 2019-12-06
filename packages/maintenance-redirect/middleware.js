import { actionTypes } from '@bufferapp/async-data-fetch';

export default () => next => action => {
  next(action);
  if (
    action.type.endsWith(actionTypes.FETCH_FAIL) &&
    action.error.includes(
      'Buffer is under maintenance, please, try again soon'
    ) &&
    action.error.includes('503')
  ) {
    window.location.replace('/maintenance');
  }
};
