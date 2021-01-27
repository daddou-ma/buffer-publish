import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actionTypes } from './reducer';

const getReconnectURL = id => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return `https://local.buffer.com/oauth/reconnect/${id}`;
  }
  return `https://buffer.com/oauth/reconnect/${id}`;
};

export default ({ getState }) => next => action => {
  // eslint-disable-line
  next(action);
  switch (action.type) {
    case actionTypes.RECONNECT_PROFILE: {
      const { shouldRedirectToAccountChannels } = getState().globalAccount;
      const reconnectURL = shouldRedirectToAccountChannels
        ? getURL.getAccountChannelsURL()
        : getReconnectURL(action.id);
      if (action.service === 'instagram') {
        /**
         * This silly looking code loads an 'img' with the
         * Instagram logout URL, which ensures the user is
         * logged out of Instagram before we send them to
         * reconnect.
         */
        const img = new Image();
        img.onerror = () => {
          window.location.assign(reconnectURL);
        };
        img.src = 'https://www.instagram.com/accounts/logoutin';
        document.getElementsByTagName('head')[0].appendChild(img);
      } else {
        window.location.assign(reconnectURL);
      }
      break;
    }
    default:
      break;
  }
};
