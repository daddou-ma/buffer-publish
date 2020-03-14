import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as modalActions } from '@bufferapp/publish-modals/reducer';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  const state = getState();
  switch (action.type) {
    case actionTypes.DELETE_CAMPAIGN: {
      const { campaign } = state.deleteCampaignModal;

      dispatch(
        dataFetchActions.fetch({
          name: 'deleteCampaign',
          args: {
            campaignId: campaign.campaignId,
          },
        })
      );
      break;
    }
    case `deleteCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { campaignId, name, color } = state.deleteCampaignModal.campaign;
      const { organizationId } = getState().profileSidebar.selectedProfile;
      dispatch(modalActions.hideDeleteCampaignModal());
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Your campaign has been deleted!',
        })
      );
      break;

    case `deleteCampaign_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(modalActions.hideDeleteCampaignModal());
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
