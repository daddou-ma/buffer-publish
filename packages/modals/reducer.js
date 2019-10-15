import keyWrapper from '@bufferapp/keywrapper';

export const initialState = {
  showSwitchPlanModal: false,
  showWelcomeModal: false,
  showWelcomePaidModal: false,
  showProfilesDisconnectedModal: false,
  switchPlanModalSource: null,
  showStealProfileModal: false,
  stealProfileUsername: null,
  showInstagramDirectPostingModal: false,
  showWelcomeB4BTrialModal: false,
  showInstagramFirstCommentModal: false,
  showB4BTrialExpiredModal: false,
  upgradeModalB4BSource: null,
  showInstagramFirstCommentProTrialModal: false,
  showCloseComposerConfirmationModal: false,
  showStoriesPromoModal: false,
  modalToShowLater: null,
};

export const actionTypes = keyWrapper('MODALS', {
  SHOW_SWITCH_PLAN_MODAL: 0,
  HIDE_SWITCH_PLAN_MODAL: 0,
  SHOW_WELCOME_MODAL: 0,
  HIDE_WELCOME_MODAL: 0,
  SHOW_WELCOME_PAID_MODAL: 0,
  HIDE_WELCOME_PAID_MODAL: 0,
  SHOW_PROFILES_DISCONNECTED_MODAL: 0,
  HIDE_PROFILES_DISCONNECTED_MODAL: 0,
  SHOW_STEAL_PROFILE_MODAL: 0,
  HIDE_STEAL_PROFILE_MODAL: 0,
  SHOW_IG_DIRECT_POSTING_MODAL: 0,
  HIDE_IG_DIRECT_POSTING_MODAL: 0,
  SHOW_WELCOME_B4B_TRIAL_MODAL: 0,
  HIDE_WELCOME_B4B_TRIAL_MODAL: 0,
  SHOW_UPGRADE_B4B_MODAL: 0,
  HIDE_UPGRADE_B4B_MODAL: 0,
  SHOW_INSTAGRAM_FIRST_COMMENT_MODAL: 0,
  HIDE_INSTAGRAM_FIRST_COMMENT_MODAL: 0,
  SHOW_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL: 0,
  HIDE_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL: 0,
  SAVE_MODAL_TO_SHOW_LATER: 0,
  SHOW_STORIES_PROMO_MODAL: 0,
  HIDE_STORIES_PROMO_MODAL: 0,
  HIDE_CLOSE_COMPOSER_CONFIRMATION_MODAL: 0,
  SHOW_CLOSE_COMPOSER_CONFIRMATION_MODAL: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_SWITCH_PLAN_MODAL:
      return {
        ...state,
        showSwitchPlanModal: true,
        switchPlanModalSource: action.source,
      };
    case actionTypes.HIDE_SWITCH_PLAN_MODAL:
      return {
        ...state,
        showSwitchPlanModal: false,
      };
    case actionTypes.SHOW_UPGRADE_B4B_MODAL:
      return {
        ...state,
        showB4BTrialExpiredModal: true,
        upgradeModalB4BSource: action.source,
      };
    case actionTypes.HIDE_UPGRADE_B4B_MODAL:
      return {
        ...state,
        showB4BTrialExpiredModal: false,
      };
    case actionTypes.SHOW_WELCOME_MODAL:
      return {
        ...state,
        showWelcomeModal: true,
      };
    case actionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_MODAL:
      return {
        ...state,
        showInstagramFirstCommentModal: true,
        firstCommentIds: action.ids,
      };
    case actionTypes.HIDE_WELCOME_MODAL:
      return {
        ...state,
        showWelcomeModal: false,
      };
    case actionTypes.SHOW_WELCOME_PAID_MODAL:
      return {
        ...state,
        showWelcomePaidModal: true,
      };
    case actionTypes.HIDE_WELCOME_PAID_MODAL:
      return {
        ...state,
        showWelcomePaidModal: false,
      };
    case actionTypes.HIDE_INSTAGRAM_FIRST_COMMENT_MODAL:
      return {
        ...state,
        showInstagramFirstCommentModal: false,
        firstCommentIds: null,
      };
    case actionTypes.SHOW_PROFILES_DISCONNECTED_MODAL:
      return {
        ...state,
        showProfilesDisconnectedModal: true,
      };
    case actionTypes.HIDE_PROFILES_DISCONNECTED_MODAL:
      return {
        ...state,
        showProfilesDisconnectedModal: false,
      };
    case actionTypes.SHOW_STEAL_PROFILE_MODAL:
      return {
        ...state,
        showStealProfileModal: true,
        stealProfileUsername: action.stealProfileUsername,
      };
    case actionTypes.HIDE_STEAL_PROFILE_MODAL:
      return {
        ...state,
        showStealProfileModal: false,
      };
    case actionTypes.SHOW_IG_DIRECT_POSTING_MODAL:
      return {
        ...state,
        showInstagramDirectPostingModal: true,
        modalToShowLater: null,
      };
    case actionTypes.HIDE_IG_DIRECT_POSTING_MODAL:
      return {
        ...state,
        showInstagramDirectPostingModal: false,
      };
    case actionTypes.SAVE_MODAL_TO_SHOW_LATER:
      return {
        ...state,
        modalToShowLater: {
          id: action.modalId,
          params: action.params,
        },
      };
    case actionTypes.SHOW_WELCOME_B4B_TRIAL_MODAL:
      return {
        ...state,
        showWelcomeB4BTrialModal: true,
      };
    case actionTypes.HIDE_WELCOME_B4B_TRIAL_MODAL:
      return {
        ...state,
        showWelcomeB4BTrialModal: false,
      };
    case actionTypes.HIDE_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL:
      return {
        ...state,
        showInstagramFirstCommentProTrialModal: false,
      };
    case actionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL:
      return {
        ...state,
        showInstagramFirstCommentProTrialModal: true,
      };
    case actionTypes.SHOW_STORIES_PROMO_MODAL:
      return {
        ...state,
        showStoriesPromoModal: true,
      };
    case actionTypes.HIDE_STORIES_PROMO_MODAL:
      return {
        ...state,
        showStoriesPromoModal: false,
      };
    case actionTypes.HIDE_CLOSE_COMPOSER_CONFIRMATION_MODAL:
      return {
        ...state,
        showCloseComposerConfirmationModal: false,
      };
    case actionTypes.SHOW_CLOSE_COMPOSER_CONFIRMATION_MODAL:
      return {
        ...state,
        showCloseComposerConfirmationModal: true,
      };
    default:
      return state;
  }
};

export const actions = {
  showSwitchPlanModal: ({ plan, source }) => ({
    type: actionTypes.SHOW_SWITCH_PLAN_MODAL,
    plan,
    source,
  }),
  hideUpgradeModal: () => ({
    type: actionTypes.HIDE_SWITCH_PLAN_MODAL,
  }),
  showB4BTrialExpiredModal: ({ source }) => ({
    type: actionTypes.SHOW_UPGRADE_B4B_MODAL,
    source,
  }),
  hideUpgradeB4BModal: () => ({
    type: actionTypes.HIDE_UPGRADE_B4B_MODAL,
  }),
  showInstagramFirstCommentModal: ({ ids }) => ({
    type: actionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_MODAL,
    ids,
  }),
  showWelcomeModal: () => ({
    type: actionTypes.SHOW_WELCOME_MODAL,
  }),
  hideWelcomeModal: () => ({
    type: actionTypes.HIDE_WELCOME_MODAL,
  }),
  showWelcomePaidModal: () => ({
    type: actionTypes.SHOW_WELCOME_PAID_MODAL,
  }),
  hideWelcomePaidModal: () => ({
    type: actionTypes.HIDE_WELCOME_PAID_MODAL,
  }),
  hideInstagramFirstCommentModal: () => ({
    type: actionTypes.HIDE_INSTAGRAM_FIRST_COMMENT_MODAL,
  }),
  hideInstagramFirstCommentProTrialModal: () => ({
    type: actionTypes.HIDE_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL,
  }),
  showInstagramFirstCommentProTrialModal: () => ({
    type: actionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL,
  }),
  showProfilesDisconnectedModal: () => ({
    type: actionTypes.SHOW_PROFILES_DISCONNECTED_MODAL,
  }),
  hideProfilesDisconnectedModal: () => ({
    type: actionTypes.HIDE_PROFILES_DISCONNECTED_MODAL,
  }),
  showStealProfileModal: ({ stealProfileUsername }) => ({
    type: actionTypes.SHOW_STEAL_PROFILE_MODAL,
    stealProfileUsername,
  }),
  hideStealProfileModal: () => ({
    type: actionTypes.HIDE_STEAL_PROFILE_MODAL,
  }),
  showInstagramDirectPostingModal: ({ profileId }) => ({
    type: actionTypes.SHOW_IG_DIRECT_POSTING_MODAL,
    profileId,
  }),
  hideInstagramDirectPostingModal: () => ({
    type: actionTypes.HIDE_IG_DIRECT_POSTING_MODAL,
  }),
  showStoriesPromoModal: () => ({
    type: actionTypes.SHOW_STORIES_PROMO_MODAL,
  }),
  hideStoriesPromoModal: () => ({
    type: actionTypes.HIDE_STORIES_PROMO_MODAL,
  }),
  saveModalToShowLater: ({ modalId, profileId }) => ({
    type: actionTypes.SAVE_MODAL_TO_SHOW_LATER,
    modalId,
    params: {
      profileId,
    },
  }),
  showWelcomeB4BTrialModal: () => ({
    type: actionTypes.SHOW_WELCOME_B4B_TRIAL_MODAL,
  }),
  hideWelcomeB4BTrialModal: () => ({
    type: actionTypes.HIDE_WELCOME_B4B_TRIAL_MODAL,
  }),
  hideCloseComposerConfirmationModal: () => ({
    type: actionTypes.HIDE_CLOSE_COMPOSER_CONFIRMATION_MODAL,
  }),
  showCloseComposerConfirmationModal: () => ({
    type: actionTypes.SHOW_CLOSE_COMPOSER_CONFIRMATION_MODAL,
  }),
};
