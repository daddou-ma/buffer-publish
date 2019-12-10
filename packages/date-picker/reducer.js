import moment from 'moment';

import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DATE_PICKER', {
  OPEN_DATE_PICKER: 'OPEN_DATE_PICKER',
  CLOSE_DATE_PICKER: 'CLOSE_DATE_PICKER',
  SET_MONTH: 'SET_MONTH',
  SET_DATE_RANGE: 'SET_DATE_RANGE',
  SET_START_DATE: 'SET_START_DATE',
  CLEAR_START_DATE: 'CLEAR_START_DATE',
  SET_END_DATE: 'SET_END_DATE',
  CLEAR_END_DATE: 'CLEAR_END_DATE',
  OPEN_CALENDAR: 'OPEN_CALENDAR',
  CLOSE_CALENDAR: 'CLOSE_CALENDAR',
});

function getDayFromTimestamp(timestamp) {
  return moment.unix(timestamp).startOf('day');
}

function formatDay(momentDay) {
  return momentDay.format('MM/DD/YYYY');
}

function formatTimestamp(timestamp) {
  return formatDay(getDayFromTimestamp(timestamp));
}

function calculateDateRange(range) {
  // We need to enfoce the start of the day to make sure
  // that the range is not effected by the time of the day
  const startDate = formatDay(moment().startOf('day').subtract(range, 'days'));
  const endDate = formatDay(moment().startOf('day').subtract(1, 'days'));
  return { startDate, endDate };
}

export function updatePresets(presets, selectedPreset) {
  return { presets: presets.map((preset) => {
    preset.selected = selectedPreset ? preset.range === selectedPreset.range : preset.name === 'Custom';
    return preset;
  }) };
}

export const presets = [
  {
    name: '90 Days',
    label: 'Past 90 Days',
    range: 90,
    selected: false,
    disabled: false,
  },
  {
    name: '30 Days',
    label: 'Past 30 Days',
    range: 30,
    selected: false,
    disabled: false,
  },
  {
    name: '28 Days',
    label: 'Past 28 Days',
    range: 28,
    selected: false,
    disabled: false,
  },
  {
    name: '7 Days',
    label: 'Past 7 Days',
    range: 7,
    selected: true,
    disabled: false,
  },
  {
    name: 'Yesterday',
    label: 'Yesterday',
    range: 1,
    selected: false,
    disabled: false,
  },
  {
    name: 'Custom',
    label: 'Custom',
    range: Infinity,
    selected: false,
    disabled: false,
  },
];

const initialState = {
  loading: true,
  open: false,
  calendarOpen: false,
  minDate: null,
  maxDate: moment().valueOf(),
  month: moment().startOf('month').unix(),
  ...calculateDateRange(7),
  presets,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MONTH:
      return {
        ...state,
        month: action.date,
      };
    case actionTypes.CLEAR_START_DATE:
      return {
        ...state,
        startDate: null,
      };
    case actionTypes.SET_START_DATE:
      return {
        ...state,
        startDate: action.date,
      };
    case actionTypes.CLEAR_END_DATE:
      return {
        ...state,
        endDate: null,
      };
    case actionTypes.SET_END_DATE:
      return {
        ...state,
        endDate: action.date,
      };
    case actionTypes.SET_DATE_RANGE:
      return {
        ...state,
        ...updatePresets(state.presets, action.preset),
        startDate: action.startDate,
        endDate: action.endDate,
        previousStartDate: null,
        previousEndDate: null,
      };
    case `get_report_${asyncDataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case `get_report_${asyncDataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...initialState,
        loading: false,
        hasError: true,
      };
    case `get_report_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
      };
    case `analytics_start_date_${asyncDataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case `analytics_start_date_${asyncDataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case `analytics_start_date_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        minDate: action.result,
        presets: state.presets.map((preset) => {
          preset.disabled = action.result > moment().subtract(preset.range, 'days');
          return preset;
        }),
      };
    case actionTypes.OPEN_DATE_PICKER:
      return {
        ...state,
        open: true,
      };
    case actionTypes.CLOSE_DATE_PICKER:
      return {
        ...state,
        open: false,
        calendarOpen: false,
        startDate: state.previousStartDate ? state.previousStartDate : state.startDate,
        endDate: state.previousEndDate ? state.previousEndDate : state.endDate,
      };
    case actionTypes.OPEN_CALENDAR:
      return {
        ...state,
        calendarOpen: true,
        previousStartDate: state.startDate,
        previousEndDate: state.endDate,
        startDate: null,
        endDate: null,
      };
    default:
      return state;
  }
};

export const actions = {
  open: () => ({
    type: actionTypes.OPEN_DATE_PICKER,
  }),
  close: () => ({
    type: actionTypes.CLOSE_DATE_PICKER,
  }),
  openCalendar: () => ({
    type: actionTypes.OPEN_CALENDAR,
  }),
  setStartDate: date => ({
    type: actionTypes.SET_START_DATE,
    date: formatTimestamp(date),
  }),
  clearStartDate: () => ({
    type: actionTypes.CLEAR_START_DATE,
  }),
  setEndDate: date => ({
    type: actionTypes.SET_END_DATE,
    date: formatTimestamp(date),
  }),
  clearEndDate: () => ({
    type: actionTypes.CLEAR_END_DATE,
  }),
  setDateRange: (startDate, endDate) => ({
    type: actionTypes.SET_DATE_RANGE,
    startDate: formatTimestamp(startDate),
    endDate: formatTimestamp(endDate),
  }),
  setDatePreset: preset => ({
    type: actionTypes.SET_DATE_RANGE,
    preset,
    ...calculateDateRange(preset.range),
  }),
  setMonth: date => ({
    type: actionTypes.SET_MONTH,
    date,
  }),
  setCurrentTab: tabId => ({
    type: actionTypes.SET_CURRENT_TAB,
    tabId,
  }),
  setDateRangeAndPreset: ({ preset, startDate, endDate }) => ({
    type: actionTypes.SET_DATE_RANGE,
    startDate,
    endDate,
    preset,
  }),
};
