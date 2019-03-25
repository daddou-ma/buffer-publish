import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'servicePosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
          gridView: true,
        },
      }));
      break;

    case `servicePosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(dataFetchActions.fetch({
        name: 'pendingPosts',
        args: {
          profileId: action.args.profileId,
          isFetchingMore: false,
        },
      }));
      break;
    default:
      break;
  }
};
