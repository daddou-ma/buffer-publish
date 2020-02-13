import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as profileActions } from '@bufferapp/publish-profile-sidebar';
import { actions as campaignsActions } from '@bufferapp/publish-campaigns';
import { getURL } from '@bufferapp/publish-server/formatters/src';

import {
  getProfilePageParams,
  getCampaignPageParams,
} from '@bufferapp/publish-routes';

const getClassicBufferURL = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/app';
  }
  return 'https://buffer.com/app';
};

export default ({ getState, dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const {
        hasPublishBeta,
        hasPublishBetaRedirect,
        hasNewPublish,
        onPaydayPage,
        isTargetedAwesomeUser,
      } = getState().initialLoading;
      const targetedUserOnPaydayPage = onPaydayPage && isTargetedAwesomeUser;
      if (!hasPublishBeta) {
        if (!hasNewPublish && !targetedUserOnPaydayPage) {
          window.location.replace(getClassicBufferURL());
        }
      } else if (!hasPublishBetaRedirect) {
        dispatch(dataFetchActions.fetch({ name: 'savePublishBetaRedirect' }));
      }
      break;
    }

    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const path = getState().router.location.pathname;
      const profiles = action.result;

      const params = getProfilePageParams({
        path,
      });

      if (params && params.profileId) {
        const profile = [...profiles].find(p => p.id === params.profileId);
        dispatch(
          profileActions.handleProfileRouteLoaded({
            selectedProfile: profile,
            tabId: params.tabId,
          })
        );
      } else if (profiles && profiles.length > 0) {
        const selectedProfile = profiles[0];
        dispatch(
          profileActions.handleProfileRouteLoaded({
            selectedProfile,
            tabId: 'queue',
          })
        );
      }

      const campaignParams = getCampaignPageParams({
        path,
      });
      if (campaignParams && campaignParams.campaigns) {
        const { hasCampaignsFlip } = getState().initialLoading;
        if (hasCampaignsFlip) {
          dispatch(
            campaignsActions.handleCampaignRouteLoaded({
              campaignId: campaignParams.campaignId,
            })
          );
        } else {
          window.location = getURL.getPublishUrl();
        }
      }

      break;
    }

    default:
      break;
  }
};
