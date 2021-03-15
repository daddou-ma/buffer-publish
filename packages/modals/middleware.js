import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as lockedProfileActionTypes } from '@bufferapp/publish-locked-profile-notification/reducer';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { actionTypes as storiesActionTypes } from '@bufferapp/publish-stories/reducer';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import getCtaProperties from '@bufferapp/publish-analytics-middleware/utils/CtaStrings';
import getCtaFromSource from '@bufferapp/publish-switch-plan-modal/utils/tracking';
import { getPlanId } from '@bufferapp/publish-plans/utils/plans';
import { actions, actionTypes } from './reducer';
import {
  shouldShowSwitchPlanModal,
  getSourceFromKey,
  shouldShowStealProfileModal,
  getShowModalValue,
  shouldShowInstagramFirstCommentModal,
} from './util/showModal';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case 'APP_INIT': {
      let modal = null;
      const { queryParams: query } = action;
      const modalKey = query.get('mk');
      const modalValue = query.get('mv');
      if (modalKey) {
        modal = { key: modalKey };
        if (modalValue) {
          modal.value = modalValue;
        }
      }
      window._showModal = modal;
      break;
    }
    case lockedProfileActionTypes.UPGRADE:
      if (action.plan === 'free') {
        dispatch(
          actions.showSwitchPlanModal({ source: 'locked_profile', plan: 'pro' })
        );
      }
      break;
    case 'INIT_MODALS': {
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
      if (shouldShowInstagramFirstCommentModal()) {
        dispatch(actions.showInstagramFirstCommentModal());
      }
      break;
    }

    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
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
      break;
    }

    case orgActionTypes.ORGANIZATION_SELECTED: {
      const {
        shouldShowProTrialExpiredModal,
        shouldShowBusinessTrialExpiredModal,
      } = action.selected;

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
