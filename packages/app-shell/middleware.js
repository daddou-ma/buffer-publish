import { actions, actionTypes } from './reducer';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => action => {
  // eslint-disable-line
  next(action);

  switch (action.type) {
    case 'APP_INIT':
      dispatch(dataFetchActions.fetch({ name: 'v1ToV2UpgradeDetails' }));
      break;
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
