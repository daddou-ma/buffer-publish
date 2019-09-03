import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

const refreshStoryGroups = (dispatch, selectedProfileId) => {
  // will need to pass correct arguments once api/rpc is done
  if (selectedProfileId) {
    dispatch(dataFetchActions.fetch({
      name: 'getStoryGroups',
      profileId: selectedProfileId,
    }));
  }
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  const { selectedProfileId } = getState().profileSidebar;
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      const storyGroup = getState().storyGroupComposer.draft;
      dispatch(dataFetchActions.fetch({
        name: 'createStoryGroup',
        args: {
          profile_id: selectedProfileId,
          scheduled_at: action.scheduledAt,
          stories: storyGroup,
        },
      }));
      break;
    }
    case actionTypes.UPDATE_STORY_GROUP:
      // TODO: change with real data
      dispatch(dataFetchActions.fetch({
        name: 'updateStoryGroup',
        args: {
          profileId: selectedProfileId,
          scheduledAt: '1567502399',
          storyGroupId: '5d6e303f869bb3000b4dcb92',
          stories: [
            {
              order: '1',
              type: 'image',
              note: 'Note 1',
              asset_url: 'https://example.com/image1.png',
              thumbnail_url: 'https://example.com/image_small1.png',
            },
            {
              order: '2',
              type: 'image',
              asset_url: 'https://example.com/image2.png',
              thumbnail_url: 'https://example.com/image_small2.png',
            },
          ],
        },
      }));
      break;
    case `createStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      refreshStoryGroups(dispatch, selectedProfileId);
      break;
    default:
      break;
  }
};
