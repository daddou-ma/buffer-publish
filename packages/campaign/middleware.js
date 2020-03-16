import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.FETCH_CAMPAIGN: {
      const { campaignId, past } = action;

      dispatch(
        dataFetchActions.fetch({
          name: 'getCampaign',
          args: {
            campaignId,
            past: past || false,
            fullItems: true,
          },
        })
      );
      break;
    }

    case `getCampaign_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error getting the campaign!',
        })
      );
      break;

    default:
      break;
  }
};
