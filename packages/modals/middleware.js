import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as lockedProfileActionTypes } from '@bufferapp/publish-locked-profile-notification';
import { actions } from './reducer';
import {
  shouldShowUpgradeModal,
  shouldShowWelcomeModal,
  getSourceFromKey,
  shouldShowStealProfileModal,
  shouldShowInstagramDirectPostingModal,
  shouldShowWelcomeModalPaidUsers,
  getShowModalValue,
  resetShowModalKey,
  shouldShowInstagramFirstCommentModal,
  shouldShowInstagramNewFirstCommentUserModal,
} from './util/showModal';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case lockedProfileActionTypes.UPGRADE:
      if (action.plan === 'free') {
        dispatch(actions.showUpgradeModal({ source: 'locked_profile' }));
      }
      break;
    case 'APP_INIT': {
      if (shouldShowUpgradeModal()) {
        dispatch(actions.showUpgradeModal({ source: getSourceFromKey() }));
      }
      if (shouldShowInstagramFirstCommentModal()) {
        dispatch(actions.showInstagramFirstCommentModal());
      }
      if (shouldShowInstagramNewFirstCommentUserModal()) {
        dispatch(actions.showInstagramNewFirstCommentUserModal());
      }
      if (shouldShowWelcomeModal()) {
        dispatch(actions.showWelcomeModal());
      }
      if (shouldShowStealProfileModal()) {
        dispatch(actions.showStealProfileModal({ stealProfileUsername: getShowModalValue() }));
      }
      if (shouldShowWelcomeModalPaidUsers()) {
        dispatch(actions.showWelcomePaidModal());
      }
      break;
    }
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (action.result && action.result.some(profile => profile.isDisconnected)) {
        dispatch(actions.showProfilesDisconnectedModal());
      }
      break;
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const message = 'welcome_to_business_modal';
      const igFcMsg = 'paid_users_to_new_publish_ig_first_comment';
      const { productFeatures: { planName } } = getState();
      const {
        messages: readMessages,
        trial,
        shouldShowProTrialExpiredModal,
        shouldShowBusinessTrialExpiredModal,
        profileCount,
      } = action.result; // user
      const hasNotReadWelcomeMessage = readMessages && !readMessages.includes(message);
      const isOnBusinessTrial = planName === 'business' && trial.onTrial;
      const hasNotReadNewFirstCommentMessage = readMessages && !readMessages.includes(igFcMsg);
      if (isOnBusinessTrial && hasNotReadWelcomeMessage && profileCount > 0) {
        /**
         * TEMP - Hiding B4B Trial Modal from showing to clean up trial start experience
         */
        // dispatch(actions.showWelcomeB4BTrialModal());
        // // Mark modal as seen
        // dispatch(dataFetchActions.fetch({ name: 'readMessage', args: { message } }));
        // if user is free, subscription hasn't been cancelled, hasExpiredProTrial
      } else if (shouldShowProTrialExpiredModal) {
        dispatch(actions.showUpgradeModal({ source: 'pro_trial_expired' }));
      } else if (shouldShowBusinessTrialExpiredModal) {
        dispatch(actions.showB4BTrialExpiredModal({ source: 'b4b_trial_expired' }));
      } else if (hasNotReadNewFirstCommentMessage && profileCount > 0) {
        dispatch(actions.showInstagramNewFirstCommentUserModal());
        // Mark modal as seen
        dispatch(dataFetchActions.fetch({ name: 'readMessage', args: { message: igFcMsg } }));
      }
      break;
    }
    case profileActionTypes.SELECT_PROFILE: {
      const profileId = getState().profileSidebar.selectedProfileId;
      const isIGBusiness = getState().profileSidebar.selectedProfile.service_type === 'business';
      if (shouldShowInstagramDirectPostingModal() && !isIGBusiness) {
        dispatch(dataFetchActions.fetch({
          name: 'checkInstagramBusiness',
          args: {
            profileId,
            callbackAction: actions.showInstagramDirectPostingModal({
              profileId,
            }),
          },
        }));
        resetShowModalKey();
      }
      break;
    }
    case 'COMPOSER_EVENT':
      if (action.eventType === 'show-upgrade-modal') {
        dispatch(actions.showUpgradeModal({ source: 'queue_limit' }));
      }
      break;
    default:
      break;
  }
};
