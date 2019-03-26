import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import moment from 'moment-timezone';

export default ({ dispatch, getState }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'sentPosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
          since: getState().appSidebar.user.is_free_user &&
            !getState().profileSidebar.selectedProfile.business ?
            null :
            moment().subtract(10, 'years').unix(), // get all posts in the last ten years
        },
      }));
      break;
    default:
      break;
  }
};
