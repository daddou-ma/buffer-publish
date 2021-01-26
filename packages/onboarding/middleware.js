import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.CONNECT_SOCIAL_ACCOUNT_ONBOARDING:
    case actionTypes.SKIP_STEP:
      dispatch(
        dataFetchActions.fetch({
          name: 'readMessage',
          args: {
            message: 'user_saw_onboarding_page',
          },
        })
      );
      break;
    case actionTypes.MANAGE_SOCIAL_ACCOUNT: {
      const { shouldRedirectToAccountChannels } = getState().globalAccount;
      const redirectURL = shouldRedirectToAccountChannels
        ? getURL.getAccountChannelsURL()
        : getURL.getManageSocialAccountURL();
      window.location.assign(redirectURL);
      break;
    }
    case actionTypes.CONNECT_SOCIAL_ACCOUNT_SIDEBAR:
      window.location = getURL.getConnectSocialAccountURL();
      break;
    default:
      break;
  }
};
