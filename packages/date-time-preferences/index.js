import { connect } from 'react-redux';
import DateTimePreferences from './components/DateTimePreferences';
import actions from './actions';

// default export = container
export default connect(
  state => ({
    initialValues: {
      format: state.user.hasTwentyFourHourTimeFormat ? '24' : '12',
      dayToStartTheWeek: state.user.week_starts_monday ? 'Monday' : 'Sunday',
    },
  }),
  dispatch => ({
    changeTwentyFourHourFormat: ({ format }) =>
      dispatch(actions.changeTwentyFourHourFormat(Number(format) === 24)),
    changeStartOfWeek: ({ dayToStartTheWeek }) =>
      dispatch(actions.changeStartOfWeek(dayToStartTheWeek === 'Monday')),
  })
)(DateTimePreferences);

export middleware from './middleware';
export * from './actions';
