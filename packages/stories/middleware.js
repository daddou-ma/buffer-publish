import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import {
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'storyGroups',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
          count: 300,
        },
      }));
      break;
    default:
      break;
  }
};
