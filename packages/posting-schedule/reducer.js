import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import cloneDeep from 'lodash.clonedeep';
import keyWrapper from '@bufferapp/keywrapper';

import { transformSchedules, mergeSchedules } from './utils/transformSchedule';
import {
  deleteTimeFromPausedSchedulesForApi,
  updatePausedSchedulesForApi,
  removePausedDaysFromScheduleForApi,
  addPausedDayBackToScheduleForApi,
  removeDayFromPausedSchedulesForApi,
  addDayToPausedSchedulesForApi,
  deleteTimeFromSchedule,
  addTimeToSchedulesForApi,
  updateScheduleTimeForApi,
  deleteAllTimesFromSchedule,
} from './utils/scheduleUtils';

export const actionTypes = keyWrapper('POSTING_SCHEDULE', {
  REMOVE_SCHEDULE_TIME: 0,
  UPDATE_SCHEDULE_TIME: 0,
  ADD_SCHEDULE_TIME: 0,
  UPDATE_TIMEZONE: 0,
  GET_TIMEZONES: 0,
  CLEAR_TIMEZONE_INPUT: 0,
  RESET_TIMEZONE_INPUT: 0,
  PAUSE_DAY: 0,
  UNPAUSE_DAY: 0,
  UPDATE_PAUSED_SCHEDULE: 0,
  REMOVE_PAUSED_TIME: 0,
  UPDATE_PAUSED_SCHEDULE_STATE: 0,
  CONFIRM_CLEAR_ALL_TIMES: 0,
  CLOSE_POPOVER: 0,
  CLEAR_ALL_TIMES: 0,
});

const initialState = {
  postingScheduleHeader: 'Your posting schedule',
  loading: false,
  scheduleLoading: true,
  days: [],
  schedules: [],
  pausedSchedules: [],
  mergedSchedules: [],
  items: [],
  profileTimezoneCity: '',
  clearTimezoneInput: false,
  paused: false,
  profileId: null,
  showClearAllModal: false,
  profileName: '',
  profileType: '',
  profileService: '',
  avatar: '',
  isManager: null,
};

export default (state = initialState, action) => {
  let mergedSchedules = [];
  let pausedSchedules = [];
  let schedules = [];
  let newSchedules = {};
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      mergedSchedules = mergeSchedules(
        action.profile.schedules,
        action.profile.pausedSchedules
      );
      return {
        ...state,
        loading: false,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(action.profile.pausedSchedules)
        ),
        scheduleLoading: false,
        schedules: action.profile.schedules,
        pausedSchedules: action.profile.pausedSchedules,
        mergedSchedules,
        profileTimezoneCity: action.profile.timezone_city,
        postingScheduleHeader: `Your posting schedule for ${action.profile.serviceUsername}`,
        paused: action.profile.paused,
        profileId: action.profile.id,
        profileName: action.profile.handle,
        profileType: action.profile.service_type,
        profileService: action.profile.service,
        avatar: action.profile.avatarUrl,
        isManager: action.profile.isManager,
      };
    case profileActionTypes.PROFILE_PAUSED:
      if (action.profileId === state.profileId) {
        return {
          ...state,
          paused: true,
        };
      }
      return state;
    case profileActionTypes.PROFILE_UNPAUSED:
      if (action.profileId === state.profileId) {
        return {
          ...state,
          paused: false,
        };
      }
      return state;
    case profileActionTypes.PUSHER_PROFILE_PAUSED_STATE:
      if (action.profileId === state.profileId) {
        return {
          ...state,
          paused: action.paused,
        };
      }
      return state;
    case `updateSchedule_${dataFetchActionTypes.FETCH_SUCCESS}`:
      mergedSchedules = mergeSchedules(
        action.result.schedules,
        state.pausedSchedules
      );
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(state.pausedSchedules)
        ),
        schedules: action.result.schedules,
      };
    case actionTypes.PAUSE_DAY:
      schedules = removePausedDaysFromScheduleForApi(
        [action.dayName],
        state.schedules
      );
      pausedSchedules = addDayToPausedSchedulesForApi(
        action.dayName,
        state.mergedSchedules,
        state.days
      );
      mergedSchedules = mergeSchedules(schedules, pausedSchedules);
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(pausedSchedules)
        ),
        schedules,
        pausedSchedules,
        mergedSchedules,
      };
    case actionTypes.UNPAUSE_DAY:
      pausedSchedules = removeDayFromPausedSchedulesForApi(
        action.dayName,
        state.pausedSchedules,
        state.days
      );
      schedules = addPausedDayBackToScheduleForApi(
        action.dayName,
        state.schedules,
        state.mergedSchedules
      );
      mergedSchedules = mergeSchedules(schedules, pausedSchedules);
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(pausedSchedules)
        ),
        schedules,
        pausedSchedules,
        mergedSchedules,
      };
    case actionTypes.REMOVE_PAUSED_TIME:
      pausedSchedules = deleteTimeFromPausedSchedulesForApi(
        state.mergedSchedules,
        state.days,
        action
      );
      mergedSchedules = mergeSchedules(state.schedules, pausedSchedules);
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(pausedSchedules)
        ),
        schedules: state.schedules,
        pausedSchedules,
        mergedSchedules,
      };
    case actionTypes.CLEAR_ALL_TIMES:
      pausedSchedules = deleteAllTimesFromSchedule(state.pausedSchedules);
      schedules = deleteAllTimesFromSchedule(state.schedules);
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(schedules),
          cloneDeep(pausedSchedules)
        ),
        schedules,
        pausedSchedules,
        mergedSchedules: schedules,
        showClearAllModal: false,
      };
    case actionTypes.UPDATE_PAUSED_SCHEDULE:
      pausedSchedules = updatePausedSchedulesForApi(
        state.mergedSchedules,
        state.days,
        action
      );
      mergedSchedules = mergeSchedules(state.schedules, pausedSchedules);
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(pausedSchedules)
        ),
        schedules: state.schedules,
        pausedSchedules,
        mergedSchedules,
      };
    case `updateTimezone_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        profileTimezoneCity: action.result.newTimezone,
        clearTimezoneInput: false,
      };
    case `getTimezones_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        items: action.result.suggestions,
      };
    case actionTypes.CLEAR_TIMEZONE_INPUT:
      return {
        ...state,
        clearTimezoneInput: true,
      };
    case actionTypes.RESET_TIMEZONE_INPUT:
      return {
        ...state,
        clearTimezoneInput: false,
      };
    case actionTypes.CONFIRM_CLEAR_ALL_TIMES:
      return {
        ...state,
        showClearAllModal: true,
      };
    case actionTypes.CLOSE_POPOVER:
      return {
        ...state,
        showClearAllModal: false,
      };
    case actionTypes.REMOVE_SCHEDULE_TIME:
      schedules = deleteTimeFromSchedule(state.schedules, action);
      mergedSchedules = mergeSchedules(schedules, state.pausedSchedules);
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(state.pausedSchedules)
        ),
        schedules,
        pausedSchedules: state.pausedSchedules,
        mergedSchedules,
      };
    case actionTypes.ADD_SCHEDULE_TIME:
      newSchedules = addTimeToSchedulesForApi(
        action,
        state.mergedSchedules,
        state.pausedSchedules
      );
      mergedSchedules = mergeSchedules(
        newSchedules.schedules,
        newSchedules.pausedSchedules
      );
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(state.pausedSchedules)
        ),
        schedules: newSchedules.schedules,
        pausedSchedules: newSchedules.pausedSchedules,
        mergedSchedules,
      };
    case actionTypes.UPDATE_SCHEDULE_TIME:
      schedules = updateScheduleTimeForApi(state.schedules, action);
      mergedSchedules = mergeSchedules(schedules, state.pausedSchedules);
      return {
        ...state,
        days: transformSchedules(
          cloneDeep(mergedSchedules),
          cloneDeep(state.pausedSchedules)
        ),
        schedules,
        pausedSchedules: state.pausedSchedules,
        mergedSchedules,
      };
    default:
      return state;
  }
};

export const actions = {
  handleRemoveTimeClick: ({
    hours,
    minutes,
    dayName,
    profileId,
    timeIndex,
    paused,
  }) => ({
    type: paused
      ? actionTypes.REMOVE_PAUSED_TIME
      : actionTypes.REMOVE_SCHEDULE_TIME,
    hours,
    minutes,
    timeIndex,
    dayName,
    profileId,
    paused,
  }),
  handleUpdateTime: ({
    hours,
    minutes,
    dayName,
    profileId,
    timeIndex,
    paused,
  }) => ({
    type: paused
      ? actionTypes.UPDATE_PAUSED_SCHEDULE
      : actionTypes.UPDATE_SCHEDULE_TIME,
    hours,
    minutes,
    timeIndex,
    dayName,
    profileId,
    paused,
  }),
  handleAddPostingTime: ({ hours, minutes, dayName, profileId }) => ({
    type: actionTypes.ADD_SCHEDULE_TIME,
    hours,
    minutes,
    dayName,
    profileId,
  }),
  handleUpdateTimezone: ({ timezone, city, profileId }) => ({
    type: actionTypes.UPDATE_TIMEZONE,
    timezone,
    city,
    profileId,
  }),
  handleGetTimezones: ({ query }) => ({
    type: actionTypes.GET_TIMEZONES,
    query,
  }),
  handleTimezoneInputFocus: () => ({
    type: actionTypes.CLEAR_TIMEZONE_INPUT,
  }),
  handleTimezoneInputBlur: () => ({
    type: actionTypes.RESET_TIMEZONE_INPUT,
  }),
  handlePauseToggleClick: ({ dayName, profileId, paused }) => ({
    type: paused ? actionTypes.UNPAUSE_DAY : actionTypes.PAUSE_DAY,
    dayName,
    profileId,
  }),
  handleClearAllClick: () => ({
    type: actionTypes.CONFIRM_CLEAR_ALL_TIMES,
  }),
  handleConfirmClearClick: ({ profileId }) => ({
    type: actionTypes.CLEAR_ALL_TIMES,
    profileId,
  }),
  handleClosePopover: () => ({
    type: actionTypes.CLOSE_POPOVER,
  }),
};
