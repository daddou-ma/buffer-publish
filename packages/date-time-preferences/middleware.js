import {
  actions as asyncDataFetch,
  actionTypes as asyncDataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './actions';

export default ({ dispatch }) => next => action => {
  switch (action.type) {
    case actionTypes.CHANGE_TWENTY_FOUR_HOUR_FORMAT:
      dispatch(
        asyncDataFetch.fetch({
          name: 'changeDateTimePreferences',
          args: {
            twentyfour_hour_time: action.twentyFourHourFormat,
          },
        })
      );
      break;
    case actionTypes.CHANGE_START_OF_WEEK:
      dispatch(
        asyncDataFetch.fetch({
          name: 'changeDateTimePreferences',
          args: {
            week_starts_monday: action.weekStartsOnMonday,
          },
        })
      );
      break;
    case `changeDateTimePreferences_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          message: 'Great! Your preferences have been saved',
        })
      );
      break;
    default:
      break;
  }
  return next(action);
};
