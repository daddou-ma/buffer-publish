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
          profileId: selectedProfileId,
          scheduledAt: action.scheduledAt,
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
          scheduledAt: '1567670400',
          storyGroupId: '5d6e303f869bb3000b4dcb92',
          stories: [
            {
              order: '1',
              type: 'image',
              note: 'Cute corgi here!',
              asset_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d2c30ce6826f300364cd6c2/7bb7c881b00575695497690ad15a8996.original.jpg',
              thumbnail_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d2c30ce6826f300364cd6c2/7bb7c881b00575695497690ad15a8996.original.jpg',
            },
            {
              order: '2',
              type: 'image',
              asset_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
              thumbnail_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
            },
          ],
        },
      }));
      break;
    case actionTypes.DELETE_STORY_GROUP:
      dispatch(dataFetchActions.fetch({
        name: 'deleteStoryGroup',
        args: {
          storyGroupId: action.storyGroupId,
        },
      }));
      break;
    case `deleteStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
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
