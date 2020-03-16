import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { campaignsPage } from '@bufferapp/publish-routes';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.FETCH_CAMPAIGN: {
      const { campaignId, past, fullItems } = action;

      dispatch(
        dataFetchActions.fetch({
          name: 'getCampaign',
          args: {
            campaignId,
            past: past || false,
            fullItems: fullItems || false,
          },
        })
      );
      break;
    }

    case `getCampaign_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      dispatch(campaignsPage.goTo());
      break;

    default:
      break;
  }
};
