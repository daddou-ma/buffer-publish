import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';
import updateStoryNote from './utils/updateStoryNote';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  const {
    stories, profileId, storyGroupId, scheduledAt,
  } = getState().storyPreview;
  const { order, note } = action;

  switch (action.type) {
    case actionTypes.SAVE_NOTE:
      dispatch(dataFetchActions.fetch({
        name: 'updateStoryGroup',
        args: {
          profileId,
          storyGroupId,
          scheduledAt,
          stories: updateStoryNote({ stories, order, note }),
        },
      }));
      break;
    default:
      break;
  }
};
