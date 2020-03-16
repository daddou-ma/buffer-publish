import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { push } from 'connected-react-router';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.FETCH_CAMPAIGN: {
      const { campaignId } = action;

      dispatch(
        dataFetchActions.fetch({
          name: 'getCampaign',
          args: {
            campaignId,
            past: false,
            fullItems: false,
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

    case actionTypes.CREATE_CAMPAIGN: {
      const { name, color } = action;

      dispatch(
        dataFetchActions.fetch({
          name: 'createCampaign',
          args: {
            name,
            color,
          },
        })
      );
      break;
    }
    // Complete once changes to the backend endpoint are made:
    case `createCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { id, name, color, globalOrganizationId } = action.result || {};
      const metadata = {
        campaignId: id,
        campaignName: name,
        campaignColor: color,
        cta: SEGMENT_NAMES.STORIES_PREVIEW_QUEUE_ADD_NOTE,
        globalOrganizationId,
      };
      dispatch(analyticsActions.trackEvent('Campaign Created', metadata));
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Great! Your new campaign was created!',
        })
      );

      if (id) {
        dispatch(push(`/campaigns/${id}/scheduled`));
      }
      break;
    }

    case `createCampaign_${dataFetchActionTypes.FETCH_FAIL}`:
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
