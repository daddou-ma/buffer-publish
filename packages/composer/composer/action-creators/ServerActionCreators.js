import AppDispatcher from '../dispatcher';
import { ActionTypes } from '../AppConstants';

const ServerActionCreators = {
  videoProcessed: processedVideoData => {
    AppDispatcher.handlePusherAction({
      actionType: ActionTypes.COMPOSER_VIDEO_PROCESSED,
      processedVideoData,
    });
  },

  profileGroupCreated: groupData => {
    AppDispatcher.handlePusherAction({
      actionType: ActionTypes.COMPOSER_PROFILE_GROUP_CREATED,
      groupData,
    });
  },

  profileGroupUpdated: groupData => {
    AppDispatcher.handlePusherAction({
      actionType: ActionTypes.COMPOSER_PROFILE_GROUP_UPDATED,
      groupData,
    });
  },

  profileGroupDeleted: groupData => {
    AppDispatcher.handlePusherAction({
      actionType: ActionTypes.COMPOSER_PROFILE_GROUP_DELETED,
      groupData,
    });
  },
};

export default ServerActionCreators;
