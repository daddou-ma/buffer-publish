import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.FETCH_CAMPAIGNS: {
      dispatch(
        dataFetchActions.fetch({
          name: 'getCampaignsList',
          args: {},
        })
      );
      break;
    }

    case `getCampaignsList_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      break;

    default:
      break;
  }
};
