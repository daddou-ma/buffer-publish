import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => action => {
  // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.SET_DIRECT_POSTING:
      window.location = getURL.getInstagramDirectPostingURL(action.profileId);
      break;
    default:
      break;
  }
};
