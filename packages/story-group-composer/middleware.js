import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

const moment = require('moment-timezone');

const refreshStoryGroups = (dispatch, selectedProfileId) => {
  // will need to pass correct arguments once api/rpc is done
  dispatch(dataFetchActions.fetch({
    name: 'getStoryGroups',
    profileId: selectedProfileId,
  }));
};

/**
 * TODO: delete this after the add Story group functionality is in place
 * Temporary method to create a mock story group grom the story group composer
 * to be able to view some data in the queue
 */
const createMockStoryGroup = (dispatch, profileSidebar) => {
  const todayDate = (new Date()).setSeconds(0);
  const { selectedProfileId } = profileSidebar;
  const { timezone } = profileSidebar.selectedProfile;
  const isTimezoneSet = !!timezone;

  const today = isTimezoneSet ? moment.tz(todayDate, timezone) : moment(todayDate);
  const selectedDateTime = today.clone().add(3, 'hours').unix();
  dispatch(dataFetchActions.fetch({
    name: 'createStoryGroup',
    args: {
      profileId: selectedProfileId,
      scheduledAt: selectedDateTime,
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
        {
          order: '3',
          type: 'video',
          upload_id: '5cf0e6be40dd59017a161f75',
          duration_ms: '60',
          file_size: '60mb',
          width: '640',
          height: '640',
          asset_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
          thumbnail_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
        },
      ],
    },
  }));
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  const { selectedProfileId } = getState().profileSidebar;
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      const storyGroup = getState().storyGroupComposer.draft;

      // TODO: delete this after the add Story group functionality is in place
      createMockStoryGroup(dispatch, getState().profileSidebar);

      if (action.scheduledAt) {
        dispatch(dataFetchActions.fetch({
          name: 'createStoryGroup',
          args: {
            profileId: selectedProfileId,
            scheduledAt: action.scheduledAt,
            stories: storyGroup,
          },
        }));
      }
      break;
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      const storyGroup = getState().storyGroupComposer.draft;
      dispatch(dataFetchActions.fetch({
        name: 'updateStoryGroup',
        args: {
          profileId: selectedProfileId,
          scheduledAt: action.scheduledAt,
          stories: storyGroup,
        },
      }));
      break;
    }
    case `createStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (selectedProfileId) {
        refreshStoryGroups(dispatch, selectedProfileId);
      }
      break;
    default:
      break;
  }
};
