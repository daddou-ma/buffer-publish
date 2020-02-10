import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.CREATE_CAMPAIGN: {
      const { name, color } = action;
      const { id } = getState().user;
      dispatch(
        dataFetchActions.fetch({
          name: 'createCampaign',
          args: {
            name,
            color,
            id,
          },
        })
      );
      break;
    }
    case `createCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const metadata = {
        campaignId: '',
        campaignName: '',
        campaignColor: '',
        cta: SEGMENT_NAMES.STORIES_PREVIEW_QUEUE_ADD_NOTE,
        organizationId: '',
      };
      dispatch(analyticsActions.trackEvent('Campaign Created', metadata));
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Great! Your new  campaign was created!',
        })
      );
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
