import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

import { actions, actionTypes } from './reducer';

const TAG_DECEMBER2020_BILLING_MISMATCH = 'dec2020-billing-mismatch';

export default ({ dispatch }) => next => action => {
  // eslint-disable-line
  next(action);

  switch (action.type) {
    case 'INIT_APPSHELL':
      /**
       * @todo Clean up all this v1 to v2 stuff - commenting out fetch for now
       *       See https://buffer.atlassian.net/browse/PUB-3172
       */
      // dispatch(dataFetchActions.fetch({ name: 'v1ToV2UpgradeDetails' }));
      break;
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { tags = [], messages = [] } = action.result;
      const hasTag = tags.includes(TAG_DECEMBER2020_BILLING_MISMATCH);
      const hasClosed = messages.includes(TAG_DECEMBER2020_BILLING_MISMATCH);
      if (hasTag && !hasClosed) {
        dispatch(
          actions.setBannerOptions({
            key: TAG_DECEMBER2020_BILLING_MISMATCH,
            themeColor: 'orange',
            customHTML: {
              __html: `Heads up: You might lose access to a few features on Dec 8. <a href="https://support.buffer.com/hc/en-us/articles/360058006794" target="_blank" rel="noreferrer noopener">Learn more here</a>.`,
            },
          })
        );
      }
      break;
    }
    case `v1ToV2UpgradeDetails_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const {
        result: { success, details },
      } = action;
      if (success && details.shouldShow) {
        dispatch(
          actions.setBannerOptions({
            key: 'v1-v2-upgrade',
            themeColor: 'orange',
            customHTML: { __html: details.noticeHtml },
          })
        );
      }
      break;
    }
    case actionTypes.ON_CLOSE_BANNER:
      if (action.key === TAG_DECEMBER2020_BILLING_MISMATCH) {
        dispatch(
          dataFetchActions.fetch({
            name: 'readMessage',
            args: {
              message: TAG_DECEMBER2020_BILLING_MISMATCH,
            },
          })
        );
      }
      if (action.key === 'v1-v2-upgrade') {
        dispatch(
          dataFetchActions.fetch({
            name: 'readMessage',
            args: {
              message: 'v1-v2-upgrade-banner',
            },
          })
        );
      }
      break;
    default:
      break;
  }
};
