import { getURL } from '@bufferapp/publish-formatters';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as asyncDataFetch,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.SET_DIRECT_POSTING:
      window.location = getURL.getInstagramDirectPostingURL(action.profileId);
      break;
    case actionTypes.CONNECT_BITLY:
      window.location = getURL.getConnectBitlyURL(action.profileId);
      break;
    case actionTypes.DISCONNECT_BITLY:
      window.location = getURL.getDisconnectBitlyURL(action.profileId);
      break;
    case profileActionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'getLinkShortener',
        args: {
          profileId: action.profile.id,
        },
      }));
      break;
    case actionTypes.CHANGE_SELECTED_LINK_SHORTENER:
      dispatch(asyncDataFetch.fetch({
        name: 'changeLinkShortener',
        args: {
          profileId: action.profileId,
          domain: action.domain,
        },
      }));
      break;
    default:
      break;
  }
};
