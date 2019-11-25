import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.FETCH_SENT_POSTS:
      dispatch(
        dataFetchActions.fetch({
          name: 'sentPosts',
          args: {
            profileId: action.profileId,
            isFetchingMore: false,
          },
        })
      );
      break;
    default:
      break;
  }
};
