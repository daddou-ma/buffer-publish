import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
// TO-DO: create general stories utils to add cross-tracking logic
import {
  getStory,
  getNoteTrackingData,
} from '@bufferapp/publish-story-group-composer/utils/Tracking';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { actionTypes } from './reducer';
import updateStoryNote from './utils/updateStoryNote';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  const {
    stories,
    profileId,
    storyGroupId,
    scheduledAt,
  } = getState().storyPreview;
  const { order, note } = action;

  switch (action.type) {
    case actionTypes.SAVE_NOTE:
      dispatch(
        dataFetchActions.fetch({
          name: 'updateStoryGroup',
          args: {
            profileId,
            storyGroupId,
            scheduledAt,
            stories: updateStoryNote({ stories, order, note }),
          },
        })
      );
      break;
    case actionTypes.TRACK_NOTE: {
      const story = getStory({ stories, order }) || {};
      if (!story.note || story.note.length === 0) {
        const channel = getState().profileSidebar.selectedProfile;
        const metadata = getNoteTrackingData({
          channel,
          cta: SEGMENT_NAMES.STORIES_PREVIEW_QUEUE_ADD_NOTE,
          note,
          storyGroupId,
        });
        dispatch(analyticsActions.trackEvent('Story Note Added', metadata));
      }
      break;
    }
    default:
      break;
  }
};
