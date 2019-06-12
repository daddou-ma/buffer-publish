import { push } from 'connected-react-router';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';

import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_TAB:
      if ((action.tabId !== getState().tabId) ||
          (action.profileId !== getState().profileId)) {
        dispatch(push(generateProfilePageRoute({
          profileId: action.profileId,
          tabId: action.tabId,
        })));
      }
      break;
    default:
      break;
  }
};
