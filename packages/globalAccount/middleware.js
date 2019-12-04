import {
  actions as asyncDataFetch,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware/actions';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  const state = getState();

  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        asyncDataFetch.fetch({
          name: 'globalAccount',
        })
      );
      break;
    case `globalAccount_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        analyticsActions.init(state.globalAccount._id, {
          name: state.appSidebar.user.name,
          email: state.globalAccount.email,
          multiProductBundleName: state.globalAccount.isAnalyzePublishBundle
            ? 'analyze_publish_eid_19'
            : null,
        })
      );
      break;
    default:
      break;
  }
};
