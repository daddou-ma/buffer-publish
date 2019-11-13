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

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const {
        hasPublishBeta,
        hasPublishBetaRedirect,
        hasNewPublish,
        onPaydayPage,
        isOnAwesomePlan,
      } = getState().betaRedirect;
      if (isOnAwesomePlan && onPaydayPage) {
        dispatch(
          dataFetchActions.fetch({
            name: 'addUserTag',
            args: {
              tag: 'awesome_user_visited_payday',
              name: 'Awesome User visited Payday page',
            },
          })
        );
      }
      if (!hasPublishBeta) {
        if (!hasNewPublish && !onPaydayPage) {
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
