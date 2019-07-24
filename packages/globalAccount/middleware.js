import {
  actions as asyncDataFetch,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  const state = getState();

  switch (action.type) {
    case 'APP_INIT':
      dispatch(asyncDataFetch.fetch({
        name: 'globalAccount',
      }));
      break;
    case `globalAccount_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(analyticsActions.init(state.globalAccount._id, {
          // organizationId: state.globalAccount.organizationId,
        name: state.appSidebar.user.name,
        email: state.globalAccount.email,
      }));
      break;
    default:
      break;
  }
};
