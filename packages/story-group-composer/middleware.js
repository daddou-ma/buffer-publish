import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as storiesActions } from '@bufferapp/publish-stories';
import { actionTypes, actions } from './reducer';

const moment = require('moment-timezone');

const refreshStoryGroups = (dispatch, selectedProfileId) => {
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
          order: '3',
          type: 'image',
          note: 'Note test',
          asset_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/64693361_463405967805780_2395832340029360483_n.jpg?_nc_cat=103&_nc_oc=AQmzEhC00UhljzvkJfn19wJ3Xvewe4dmSrud0XseL_hcxVts6xAyXT6YKZ34fZ_KN6Q&_nc_ht=scontent.xx&oh=c7d5d42b03170132ad9fc88c5fa6dd27&oe=5E0E3B3F',
          thumbnail_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/64693361_463405967805780_2395832340029360483_n.jpg?_nc_cat=103&_nc_oc=AQmzEhC00UhljzvkJfn19wJ3Xvewe4dmSrud0XseL_hcxVts6xAyXT6YKZ34fZ_KN6Q&_nc_ht=scontent.xx&oh=c7d5d42b03170132ad9fc88c5fa6dd27&oe=5E0E3B3F',
        },
        {
          order: '5',
          type: 'image',
          note: 'Another test note',
          asset_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/64958182_469747690260790_824034371647106114_n.jpg?_nc_cat=104&_nc_oc=AQl9eS7N88IYXzVA8GzLeqQOEdc5_Hm2as8kNANA5Y9rXpiaXqB-MTlbefLNGAQtqNU&_nc_ht=scontent.xx&oh=de80f32234dca9b1642ad8a03918c180&oe=5E11CB4D',
          thumbnail_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/64958182_469747690260790_824034371647106114_n.jpg?_nc_cat=104&_nc_oc=AQl9eS7N88IYXzVA8GzLeqQOEdc5_Hm2as8kNANA5Y9rXpiaXqB-MTlbefLNGAQtqNU&_nc_ht=scontent.xx&oh=de80f32234dca9b1642ad8a03918c180&oe=5E11CB4D',
        },
        {
          order: '7',
          type: 'image',
          note: 'Another test',
          asset_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/62133233_2353534508193805_4528030472851213025_n.jpg?_nc_cat=101&_nc_oc=AQnTIKioxL51pNpjgYPhsOQgVn79-mT_xSoqr7FTnZtqA695G_ZFi3dezoopZNvmuvc&_nc_ht=scontent.xx&oh=77148f734756776404368185e5330e76&oe=5DFDB39C',
          thumbnail_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/62133233_2353534508193805_4528030472851213025_n.jpg?_nc_cat=101&_nc_oc=AQnTIKioxL51pNpjgYPhsOQgVn79-mT_xSoqr7FTnZtqA695G_ZFi3dezoopZNvmuvc&_nc_ht=scontent.xx&oh=77148f734756776404368185e5330e76&oe=5DFDB39C',
        },
        {
          order: '6',
          type: 'image',
          asset_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/51904493_2605757126117819_4704228188946234351_n.jpg?_nc_cat=109&_nc_oc=AQl4Lu4wYydVjQmDdU0nrweHJRaEjVHikqs6U8ADq_77FfyUbH6A_3RNkhjui_SKpmE&_nc_ht=scontent.xx&oh=215953a1a44d523dfb3611aae4326362&oe=5DF73CEC',
          thumbnail_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/51904493_2605757126117819_4704228188946234351_n.jpg?_nc_cat=109&_nc_oc=AQl4Lu4wYydVjQmDdU0nrweHJRaEjVHikqs6U8ADq_77FfyUbH6A_3RNkhjui_SKpmE&_nc_ht=scontent.xx&oh=215953a1a44d523dfb3611aae4326362&oe=5DF73CEC',
        },
        {
          order: '8',
          type: 'image',
          asset_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/51753266_823091141398481_9177906822987042622_n.jpg?_nc_cat=107&_nc_oc=AQm3BX_cfBS8hiGEFYgEgC-q3Qlfx91LuWxjIjakylv_GZE-lz1GwcnzWVZWsVTyrtg&_nc_ht=scontent.xx&oh=b84fe1f0c8f74b26689d71e78c0ecb5c&oe=5E139A15',
          thumbnail_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/51753266_823091141398481_9177906822987042622_n.jpg?_nc_cat=107&_nc_oc=AQm3BX_cfBS8hiGEFYgEgC-q3Qlfx91LuWxjIjakylv_GZE-lz1GwcnzWVZWsVTyrtg&_nc_ht=scontent.xx&oh=b84fe1f0c8f74b26689d71e78c0ecb5c&oe=5E139A15',
        },
        {
          order: '9',
          type: 'image',
          asset_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/46396647_2285679668129303_5231056899095810437_n.jpg?_nc_cat=111&_nc_oc=AQk5O-3JZ39mJcCoy2kbq2_Ev2AsiCAbij6x09qUbExzOR3tXVt2tYp5kZVeQwT2g8E&_nc_ht=scontent.xx&oh=212273dbf71c3442a2f936b74384198e&oe=5E0DEB75',
          thumbnail_url: 'https://scontent.xx.fbcdn.net/v/t51.2885-15/46396647_2285679668129303_5231056899095810437_n.jpg?_nc_cat=111&_nc_oc=AQk5O-3JZ39mJcCoy2kbq2_Ev2AsiCAbij6x09qUbExzOR3tXVt2tYp5kZVeQwT2g8E&_nc_ht=scontent.xx&oh=212273dbf71c3442a2f936b74384198e&oe=5E0DEB75',
        },
        {
          order: '4',
          type: 'image',
          asset_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
          thumbnail_url: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5d5f9c64869bb331a32f5552/7f6dd5f725507d760a782527adacb055.original.jpg',
        },
        {
          order: '2',
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
      const { stories } = getState().storyGroupComposer.draft;
      const { scheduledAt } = action;
      if (scheduledAt) {
        dispatch(dataFetchActions.fetch({
          name: 'createStoryGroup',
          args: {
            profileId: selectedProfileId,
            scheduledAt,
            stories,
          },
        }));
      }
      break;
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      const { stories, storyGroupId } = getState().storyGroupComposer.draft;
      dispatch(dataFetchActions.fetch({
        name: 'updateStoryGroup',
        args: {
          profileId: selectedProfileId,
          scheduledAt: action.scheduledAt,
          stories,
          storyGroupId,
        },
      }));
      break;
    }
    case `createStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(storiesActions.handleCloseStoriesComposer());
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Great! This story has been added to your queue.',
      }));
      break;
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(storiesActions.handleCloseStoriesComposer());
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Great! This story has been updated.',
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
