import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as lockedProfileActionTypes } from '@bufferapp/publish-locked-profile-notification/reducer';
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
  shouldShowWelcomeModalPaidUsers,
  getShowModalValue,
  shouldShowInstagramFirstCommentModal,
} from './util/showModal';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case lockedProfileActionTypes.UPGRADE:
      if (action.plan === 'free') {
        dispatch(
          actions.showSwitchPlanModal({ source: 'locked_profile', plan: 'pro' })
        );
      }
      break;
    case 'APP_INIT': {
      if (getState().user.plan === 'awesome') {
        // Context: https://buffer.atlassian.net/browse/PUB-2004
        return;
      }
      if (shouldShowSwitchPlanModal()) {
        dispatch(
          actions.showSwitchPlanModal({
            source: getSourceFromKey(),
            plan: shouldShowSwitchPlanModal(),
          })
        );
      }
      if (shouldShowStealProfileModal()) {
        dispatch(
          actions.showStealProfileModal({
            stealProfileUsername: getShowModalValue(),
          })
        );
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
      if (getState().user.plan === 'awesome') {
        // Context: https://buffer.atlassian.net/browse/PUB-2004
        return;
      }
      if (
        action.result &&
        action.result.some(profile => profile.isDisconnected)
      ) {
        dispatch(actions.showProfilesDisconnectedModal());
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
      if (
        shouldShowProTrialExpiredModal ||
        shouldShowBusinessTrialExpiredModal
      ) {
        dispatch(actions.showTrialCompleteModal());
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
        dispatch(
          actions.showSwitchPlanModal({ source: 'queue_limit', plan: 'pro' })
        );
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
