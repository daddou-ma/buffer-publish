import {
  actions as asyncDataFetch,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  const state = getState();

  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(asyncDataFetch.fetch({
        name: 'globalAccount',
      }));
      break;
    case `globalAccount_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(analyticsActions.init(state.globalAccount._id, {
        name: state.appSidebar.user.name,
        email: state.globalAccount.email,
      }));
      // Temp location for page tracking so we just know how many times someone is
      // loading the dashboard.
      setTimeout(() => {
        dispatch(analyticsActions.pageChange('New Publish', {
          app: 'new_publish',
        }));
      }, 500);
      break;
    default:
      break;
  }
};
