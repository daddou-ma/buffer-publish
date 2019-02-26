import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.UPDATE_PAUSED_SCHEDULE:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules: getState().postingSchedule.pausedSchedules,
          schedules: getState().postingSchedule.schedules,
          showNotification: true,
        },
      }));
      break;
    case actionTypes.UPDATE_SCHEDULE_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updateSchedule',
        args: {
          profileId: action.profileId,
          schedules: getState().postingSchedule.schedules,
        },
      }));
      break;
    case actionTypes.PAUSE_DAY:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules: getState().postingSchedule.pausedSchedules,
          schedules: getState().postingSchedule.schedules,
          showNotification: true,
        },
      }));
      break;
    case actionTypes.UNPAUSE_DAY:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules: getState().postingSchedule.pausedSchedules,
          schedules: getState().postingSchedule.schedules,
          emptyPausedSchedules: getState().postingSchedule.pausedSchedules.length === 0,
          showNotification: true,
        },
      }));
      break;
    case actionTypes.ADD_SCHEDULE_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules: getState().postingSchedule.pausedSchedules,
          schedules: getState().postingSchedule.schedules,
        },
      }));
      break;
    case actionTypes.REMOVE_PAUSED_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules: getState().postingSchedule.pausedSchedules,
          schedules: getState().postingSchedule.schedules,
          showNotification: true,
        },
      }));
      break;
    case actionTypes.REMOVE_SCHEDULE_TIME:
      dispatch(dataFetchActions.fetch({
        name: 'updateSchedule',
        args: {
          profileId: action.profileId,
          schedules: getState().postingSchedule.schedules,
        },
      }));
      break;
    case actionTypes.CLEAR_ALL_TIMES:
      dispatch(dataFetchActions.fetch({
        name: 'updatePausedSchedules',
        args: {
          profileId: action.profileId,
          pausedSchedules: getState().postingSchedule.pausedSchedules,
          schedules: getState().postingSchedule.schedules,
          emptyPausedSchedules: true,
          showNotification: false,
        },
      }));
      break;
    case actionTypes.UPDATE_TIMEZONE:
      dispatch(dataFetchActions.fetch({
        name: 'updateTimezone',
        args: {
          profileId: action.profileId,
          timezone: action.timezone,
          city: action.city,
        },
      }));
      break;
    case actionTypes.GET_TIMEZONES:
      dispatch(dataFetchActions.fetch({
        name: 'getTimezones',
        args: {
          query: action.query,
        },
      }));
      break;
    case `updateSchedule_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Awesome! Your schedule has been successfully saved.',
      }));
      break;
    case `updateSchedule_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `updateTimezone_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Awesome! Your schedule has been successfully saved.',
      }));
      break;
    case `updateTimezone_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `updatePausedSchedules_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Awesome! Your schedule has been successfully saved.',
      }));
      break;
    case `updatePausedSchedules_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: `Oh no, we had trouble updating your paused days!
        Please contact support if this persists.`,
      }));
      dispatch(dataFetchActions.fetch({
        name: 'profiles',
      }));
      break;
    default:
      break;
  }
};
