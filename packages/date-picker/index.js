import moment from 'moment';
import { connect } from 'react-redux';
import DatePicker from './components/DatePicker';
import { actions } from './reducer';

export function convertDateToTimestamp(date) {
  return date ?
    moment(date, 'MM/DD/YYYY').unix() :
    null;
}

// default export = container
export default connect(
  (state, ownProps) => ({
    loading: ownProps.staticData ? false : state.date.loading,
    startDate: convertDateToTimestamp(state.date.startDate),
    endDate: convertDateToTimestamp(state.date.endDate),
    isOpen: state.date.open,
    calendarOpen: state.date.calendarOpen,
    minDate: ownProps.staticData ? null : state.date.minDate,
    maxDate: state.date.maxDate,
    month: state.date.month,
    presets: state.date.presets,
    // add state here
  }),
  dispatch => ({
    open: () => dispatch(actions.open()),
    close: () => dispatch(actions.close()),
    setMonth: timestamp => dispatch(actions.setMonth(timestamp)),
    setStartDate: date => dispatch(actions.setStartDate(date)),
    clearStartDate: () => dispatch(actions.clearStartDate()),
    clearEndDate: () => dispatch(actions.clearEndDate()),
    setEndDate: date => dispatch(actions.setEndDate(date)),
    setDateRange: (start, end) => dispatch(actions.setDateRange(start, end)),
    selectPreset: (preset) => {
      if (preset.range !== Infinity) {
        dispatch(actions.setDatePreset(preset));
        dispatch(actions.close());
      } else {
        dispatch(actions.openCalendar());
      }
    },
  }),
)(DatePicker);

// export reducer, actions and action types
export reducer, { actions, actionTypes, presets } from './reducer';
export middleware from './middleware';
