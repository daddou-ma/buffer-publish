import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

const refreshStoryGroups = (dispatch) => {
  dispatch(dataFetchActions.fetch({
    name: 'getStoryGroups',
  }));
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      const storyGroup = getState().storyGroupComposer.draft;
      dispatch(dataFetchActions.fetch({
        name: 'createStoryGroup',
        args: {
          storyGroup,
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
      refreshStoryGroups(dispatch);
      break;
    default:
      break;
  }
};
