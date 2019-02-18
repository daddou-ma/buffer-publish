import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

export default ({ dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'pastRemindersPosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
        },
      }));
      break;
    default:
      break;
  }
};
