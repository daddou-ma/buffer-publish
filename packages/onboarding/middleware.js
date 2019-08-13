import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.CONNECT_SOCIAL_ACCOUNT:
      window.location = getURL.getConnectSocialAccountURL();
      break;
    case actionTypes.SKIP_STEP:
      dispatch(dataFetchActions.fetch({
        name: 'readMessage',
        args: {
          message: 'user_saw_onboarding_page',
        },
      }));
      break;
    default:
      break;
  }
};
