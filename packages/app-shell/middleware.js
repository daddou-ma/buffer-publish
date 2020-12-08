import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

import { actions, actionTypes } from './reducer';

const TAG_DECEMBER2020_BILLING_MISMATCH_DOWNGRADED =
  'billing-mismatch-downgraded-to-free';

export default ({ dispatch }) => next => action => {
  // eslint-disable-line
  next(action);

  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { tags = [], messages = [] } = action.result;
      const hasTag = tags.includes(
        TAG_DECEMBER2020_BILLING_MISMATCH_DOWNGRADED
      );
      const hasClosed = messages.includes(
        TAG_DECEMBER2020_BILLING_MISMATCH_DOWNGRADED
      );
      if (hasTag && !hasClosed) {
        dispatch(
          actions.setBannerOptions({
            key: TAG_DECEMBER2020_BILLING_MISMATCH_DOWNGRADED,
            themeColor: 'orange',
            customHTML: {
              __html: `Heads up: Due to a billing error, your account has been moved to our Free plan. <a href="https://support.buffer.com/hc/en-us/articles/360058006794" target="_blank" rel="noreferrer noopener">Learn more</a>.`,
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
      if (action.key === TAG_DECEMBER2020_BILLING_MISMATCH_DOWNGRADED) {
        dispatch(
          dataFetchActions.fetch({
            name: 'readMessage',
            args: {
              message: TAG_DECEMBER2020_BILLING_MISMATCH_DOWNGRADED,
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
