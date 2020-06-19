import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';

const getClassicBufferURL = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/app';
  }
  return 'https://buffer.com/app';
};

export default ({ getState, dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const {
        hasPublishBeta,
        hasPublishBetaRedirect,
        hasNewPublish,
        onPaydayPage,
        isTargetedAwesomeUser,
      } = getState().initialLoading;
      const targetedUserOnPaydayPage = onPaydayPage && isTargetedAwesomeUser;
      if (!hasPublishBeta) {
        if (!hasNewPublish && !targetedUserOnPaydayPage) {
          window.location.replace(getClassicBufferURL());
        }
      } else if (!hasPublishBetaRedirect) {
        dispatch(dataFetchActions.fetch({ name: 'savePublishBetaRedirect' }));
      }
      break;
    }
    default:
      break;
  }
};
