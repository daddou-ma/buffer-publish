import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const hasCampaignsFlip =
        getState().appSidebar.user.features?.includes('campaigns') || false;

      if (hasCampaignsFlip) {
        console.log('FETCHING MAIN ORG ', hasCampaignsFlip);
        /*
        dispatch(
          dataFetchActions.fetch({
            name: 'getUserMainOrganization',
            args: {},
          })
          );
        */
      }
      break;
    }
    case actionTypes.CREATE_CAMPAIGN: {
      const { name, color } = action;
      const { mainOrganization } = getState().user;
      // const { mainOrganization } = getState().campaigns;
      const organizationId = mainOrganization?._id;
      dispatch(
        dataFetchActions.fetch({
          name: 'createCampaign',
          args: {
            name,
            color,
            organizationId,
          },
        })
      );
      break;
    }
    // Complete once changes to the backend endpoint are made:
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
    case actionTypes.HANDLE_CAMPAIGN_ROUTED: {
      // const { campaignId } = action;
      dispatch(profileSidebarActions.handleCampaignsClick());
      break;
    }
    default:
      break;
  }
};
