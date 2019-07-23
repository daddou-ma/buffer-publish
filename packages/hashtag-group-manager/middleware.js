import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { trackAction } from '@bufferapp/publish-data-tracking';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

const refreshHashtagGroups = (dispatch, organizationId) => {
  if (organizationId) {
    dispatch(dataFetchActions.fetch({
      name: 'hashtagGroups',
      args: {
        organizationId,
      },
    }));
  }
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  const { organizationId } = getState().profileSidebar.selectedProfile;
  switch (action.type) {
    case actionTypes.CANCEL_HASHTAG_GROUP:
      //
      break;
    case actionTypes.SAVE_HASHTAG_GROUP:
      const { name, text } = getState().hashtagGroups;
      dispatch(dataFetchActions.fetch({
        name: 'createHashtagGroup',
        args: {
          organizationId,
          name,
          text,
        },
      }));
      break;
    case actionTypes.DELETE_HASHTAG_GROUP:
      dispatch(dataFetchActions.fetch({
        name: 'deleteHashtagGroup',
        args: {
          organizationId,
          snippetId: action.groupId,
        },
      }));
      break;
    case `deleteHashtagGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.result.message,
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `deleteHashtagGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      refreshHashtagGroups(dispatch, organizationId);
      break;
    case actionTypes.INSERT_HASHTAG_GROUP:
      trackAction({ location: 'hashtagManager', action: 'hashtag_inserted', metadata: { organizationId } });
      break;
    case `createHashtagGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      refreshHashtagGroups(dispatch, organizationId);
      trackAction({ location: 'hashtagManager', action: 'hashtag_created', metadata: { organizationId } });
      break;    default:
      break;
  }
};
