import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actionTypes as lockedProfileActionTypes } from '@bufferapp/publish-locked-profile-notification/reducer';
import { actionTypes as thirdPartyActionTypes } from '@bufferapp/publish-thirdparty/reducer';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { actionTypes as storiesActionTypes } from '@bufferapp/publish-stories/reducer';
import getCtaProperties from '@bufferapp/publish-analytics-middleware/utils/CtaStrings';
import getCtaFromSource from '@bufferapp/publish-switch-plan-modal/utils/tracking';
import { getPlanId } from '@bufferapp/publish-plans/utils/plans';
import { actions, actionTypes } from './reducer';
import {
  shouldShowSwitchPlanModal,
  shouldShowWelcomeModal,
  getSourceFromKey,
  shouldShowStealProfileModal,
  shouldShowInstagramDirectPostingModal,
  shouldShowWelcomeModalPaidUsers,
  getShowModalValue,
  resetShowModalKey,
  shouldShowInstagramFirstCommentModal,
} from './util/showModal';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case lockedProfileActionTypes.UPGRADE:
      if (action.plan === 'free') {
        dispatch(actions.showSwitchPlanModal({ source: 'locked_profile', plan: 'pro' }));
      }
      break;
    case 'APP_INIT': {
      if (getState().appSidebar.user.plan === 'awesome') {
        // Context: https://buffer.atlassian.net/browse/PUB-2004
        return;
      }
      if (shouldShowSwitchPlanModal()) {
        dispatch(actions.showSwitchPlanModal({
          source: getSourceFromKey(),
          plan: shouldShowSwitchPlanModal(),
        }));
      }
      if (shouldShowStealProfileModal()) {
        dispatch(actions.showStealProfileModal({ stealProfileUsername: getShowModalValue() }));
      }
      if (shouldShowWelcomeModalPaidUsers()) {
        dispatch(actions.showWelcomePaidModal());
        // Don't overwhelm new users with lots of modals.
        return;
      }
      if (shouldShowInstagramFirstCommentModal()) {
        dispatch(actions.showInstagramFirstCommentModal());
      }
      if (shouldShowWelcomeModal()) {
        dispatch(actions.showWelcomeModal());
      }
      break;
    }

    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      if (getState().appSidebar.user.plan === 'awesome') {
        // Context: https://buffer.atlassian.net/browse/PUB-2004
        return;
      }
      if (action.result && action.result.some(profile => profile.isDisconnected)) {
        dispatch(actions.showProfilesDisconnectedModal());
      }

      const {
        isBusinessTeamMember,
        plan,
        messages,
      } = getState().appSidebar.user;

      // Make sure the Shop Grid Promo Modal doesn't open on top of the disconnect modal
      if (
        plan === 'free' &&
        !isBusinessTeamMember &&
        !messages.includes('user_saw_shopgrid_promo')
      ) {
        if (
          action.result &&
          action.result.some(profile => profile.isDisconnected)
        ) {
          dispatch(
            actions.saveModalToShowLater({
              modalId: actionTypes.SHOW_SHOP_GRID_PROMO_MODAL,
            })
          );
        } else {
          dispatch(actions.showShopGridPromoModal());
        }
      }
      break;
    }

    case actionTypes.HIDE_PROFILES_DISCONNECTED_MODAL: {
      const modalToShow = getState().modals.modalToShowLater;
      if (!modalToShow) {
        return;
      }

      if (modalToShow.id === actionTypes.SHOW_SHOP_GRID_PROMO_MODAL) {
        dispatch(actions.showShopGridPromoModal());
      }

      break;
    }

    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const {
        shouldShowProTrialExpiredModal,
        shouldShowBusinessTrialExpiredModal,
        isOnAwesomePlan,
      } = action.result; // userData
      if (isOnAwesomePlan) {
        // Context: https://buffer.atlassian.net/browse/PUB-2004
        return;
      }
      if (shouldShowProTrialExpiredModal || shouldShowBusinessTrialExpiredModal) {
        dispatch(actions.showTrialCompleteModal());
      }
      break;
    }

    case thirdPartyActionTypes.APPCUES_FINISHED: {
      const modalToShow = getState().modals.modalToShowLater;
      if (!modalToShow) {
        return;
      }

      if (modalToShow.id === actionTypes.SHOW_IG_DIRECT_POSTING_MODAL) {
        dispatch(actions.showInstagramDirectPostingModal({
          profileId: modalToShow.params.profileId,
        }));
      }

      break;
    }

    case thirdPartyActionTypes.APPCUES_STARTED: {
      const tourInProgress = getState().thirdparty.appCues.inProgress;
      const selectedProfileId = getState().profileSidebar.selectedProfileId;

      if (tourInProgress) {
        dispatch(actions.hideInstagramDirectPostingModal());
        dispatch(actions.saveModalToShowLater({
          modalId: actionTypes.SHOW_IG_DIRECT_POSTING_MODAL,
          selectedProfileId,
        }));
      }
      break;
    }

    case profileActionTypes.SELECT_PROFILE: {
      const profileId = getState().profileSidebar.selectedProfileId;
      const isIGBusiness = getState().profileSidebar.selectedProfile.service_type === 'business';
      const tourInProgress = getState().thirdparty.appCues.inProgress;

      if (getState().appSidebar.user.plan === 'awesome') {
        // Context: https://buffer.atlassian.net/browse/PUB-2004
        return;
      }

      if (shouldShowInstagramDirectPostingModal() && !isIGBusiness) {
        if (tourInProgress) {
          dispatch(dataFetchActions.fetch({
            name: 'checkInstagramBusiness',
            args: {
              profileId,
              callbackAction: actions.saveModalToShowLater({
                modalId: actionTypes.SHOW_IG_DIRECT_POSTING_MODAL,
                profileId,
              }),
            },
          }));
        } else {
          dispatch(dataFetchActions.fetch({
            name: 'checkInstagramBusiness',
            args: {
              profileId,
              callbackAction: actions.showInstagramDirectPostingModal({
                profileId,
              }),
            },
          }));
        }

        resetShowModalKey();
      }
      break;
    }
    case storiesActionTypes.STORY_SENT: {
      // the composer closes after pusher sent event, so close the confirmation modal too
      const { showCloseComposerConfirmationModal } = getState().modals;
      if (showCloseComposerConfirmationModal) {
        dispatch(actions.hideCloseComposerConfirmationModal());
      }
      break;
    }
    case 'COMPOSER_EVENT':
      if (action.eventType === 'show-switch-plan-modal') {
        dispatch(actions.showSwitchPlanModal({ source: 'queue_limit', plan: 'pro' }));
      }
      break;

    case actionTypes.SHOW_SWITCH_PLAN_MODAL: {
      const { source, plan } = action;
      const ctaName = getCtaFromSource(source);
      const ctaProperties = getCtaProperties(ctaName);

      const metadata = {
        planName: plan,
        planId: getPlanId(plan),
        ...ctaProperties,
      };

      dispatch(analyticsActions.trackEvent('Modal Payment Opened', metadata));
      break;
    }
    default:
      break;
  }
};
