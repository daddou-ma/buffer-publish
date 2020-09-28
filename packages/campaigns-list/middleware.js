import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import { actions as notificationActions } from '@bufferapp/notifications';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case orgActionTypes.ORGANIZATION_SELECTED: {
      const { globalOrgId, hasCampaignsFeature } = action.selected;
      if (hasCampaignsFeature) {
        dispatch(
          dataFetchActions.fetch({
            name: 'getCampaignsList',
            args: { globalOrgId },
          })
        );
      }
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
