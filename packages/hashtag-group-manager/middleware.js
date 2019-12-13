import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { actionTypes } from './reducer';
import countHashtagsInText from './utils/HashtagCounter';

const refreshHashtagGroups = (dispatch, organizationId) => {
  if (organizationId) {
    dispatch(
      dataFetchActions.fetch({
        name: 'getHashtagGroups',
        args: {
          organizationId,
        },
      })
    );
  }
};

const getTrackingMetadataFromStoryGroup = (name, text) => {
  return {
    hashtagGroupName: name,
    hashtagCount: countHashtagsInText(text),
    product: 'publish',
  };
};

export default ({ getState, dispatch }) => next => action => {
  next(action);
  const { organizationId } = getState().profileSidebar.selectedProfile;
  switch (action.type) {
    case actionTypes.SAVE_HASHTAG_GROUP: {
      const { name, text } = getState().hashtagGroups;
      dispatch(
        dataFetchActions.fetch({
          name: 'createHashtagGroup',
          args: {
            organizationId,
            name,
            text,
          },
        })
      );
      break;
    }
    case actionTypes.DELETE_HASHTAG_GROUP:
      dispatch(
        dataFetchActions.fetch({
          name: 'deleteHashtagGroup',
          args: {
            organizationId,
            snippetId: action.groupId,
          },
        })
      );

      dispatch(
        analyticsActions.trackEvent(
          'Hashtag Group Deleted',
          getTrackingMetadataFromStoryGroup(action.name, action.text)
        )
      );
      break;
    case `createHashtagGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      break;
    case `deleteHashtagGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      refreshHashtagGroups(dispatch, organizationId);
      break;
    case profileSidebarActionTypes.SELECT_PROFILE:
      refreshHashtagGroups(dispatch, organizationId);
      break;
    case actionTypes.INSERT_HASHTAG_GROUP:
      dispatch(
        analyticsActions.trackEvent(
          'Hashtag Group Inserted',
          getTrackingMetadataFromStoryGroup(action.name, action.text)
        )
      );
      break;
    case `createHashtagGroup_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      dispatch(
        analyticsActions.trackEvent(
          'Hashtag Group Created',
          getTrackingMetadataFromStoryGroup(action.args.name, action.args.text)
        )
      );
      break;
    }
    default:
      break;
  }
};
