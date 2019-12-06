import AppDispatcher from '../dispatcher';
import { ActionTypes, NotificationTypes } from '../AppConstants';

const NotificationActionCreators = {
  queueError: ({
    scope,
    errorCode,
    message,
    onlyCloseOnce,
    showSoftAndHardCloseOptions,
    isUnique,
    data,
  }) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.QUEUE_NOTIFICATION,
      type: NotificationTypes.ERROR,
      scope,
      errorCode,
      message,
      onlyCloseOnce,
      showSoftAndHardCloseOptions,
      isUnique,
      data,
    });
  },

  queueSuccess: ({
    scope,
    message,
    onlyCloseOnce,
    showSoftAndHardCloseOptions,
    isUnique,
    data,
  }) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.QUEUE_NOTIFICATION,
      type: NotificationTypes.SUCCESS,
      scope,
      message,
      onlyCloseOnce,
      showSoftAndHardCloseOptions,
      isUnique,
      data,
    });
  },

  queueInfo: ({
    scope,
    message,
    onlyCloseOnce,
    showSoftAndHardCloseOptions,
    isUnique,
    data,
    cta,
  }) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.QUEUE_NOTIFICATION,
      type: NotificationTypes.INFO,
      scope,
      message,
      onlyCloseOnce,
      showSoftAndHardCloseOptions,
      isUnique,
      data,
      cta,
    });
  },

  removeNotification: (id, data = {}) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REMOVE_NOTIFICATION,
      id,
      data,
    });
  },

  removeNotificationCookie: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REMOVE_NOTIFICATION_COOKIE,
      id,
    });
  },

  removeAllNotificationsByScope: (scope, comesFromDirectUserAction = false) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REMOVE_ALL_NOTIFICATIONS_BY_SCOPE,
      scope,
      comesFromDirectUserAction,
    });
  },

  removeComposerOmniboxNotices: draftId => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.REMOVE_COMPOSER_NOTICES,
      draftId,
    });
  },
};

export default NotificationActionCreators;
