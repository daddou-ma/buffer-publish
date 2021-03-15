import keyWrapper from '@bufferapp/keywrapper';

export const initialState = {
  showSwitchPlanModal: false,
  showProfilesDisconnectedModal: false,
  switchPlanModalSource: null,
  showStealProfileModal: false,
  stealProfileUsername: null,
  showInstagramFirstCommentModal: false,
  showTrialCompleteModal: false,
  showInstagramFirstCommentProTrialModal: false,
  showCloseComposerConfirmationModal: false,
  modalToShowLater: null,
  showDeleteCampaignModal: false,
  page: 'queue',
};

export const actionTypes = keyWrapper('MODALS', {
  SHOW_SWITCH_PLAN_MODAL: 0,
  HIDE_SWITCH_PLAN_MODAL: 0,
  SHOW_PROFILES_DISCONNECTED_MODAL: 0,
  HIDE_PROFILES_DISCONNECTED_MODAL: 0,
  SHOW_STEAL_PROFILE_MODAL: 0,
  HIDE_STEAL_PROFILE_MODAL: 0,
  SHOW_TRIAL_COMPLETE_MODAL: 0,
  HIDE_TRIAL_COMPLETE_MODAL: 0,
  SHOW_INSTAGRAM_FIRST_COMMENT_MODAL: 0,
  HIDE_INSTAGRAM_FIRST_COMMENT_MODAL: 0,
  SHOW_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL: 0,
  HIDE_INSTAGRAM_FIRST_COMMENT_PRO_TRIAL_MODAL: 0,
  SAVE_MODAL_TO_SHOW_LATER: 0,
  HIDE_CLOSE_COMPOSER_CONFIRMATION_MODAL: 0,
  SHOW_CLOSE_COMPOSER_CONFIRMATION_MODAL: 0,
  SHOW_DELETE_CAMPAIGN_MODAL: 0,
  HIDE_DELETE_CAMPAIGN_MODAL: 0,
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
    case actionTypes.SHOW_TRIAL_COMPLETE_MODAL:
      return {
        ...state,
        showTrialCompleteModal: true,
      };
    case actionTypes.HIDE_TRIAL_COMPLETE_MODAL:
      return {
        ...state,
        showTrialCompleteModal: false,
      };
    case actionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_MODAL:
      return {
        ...state,
        showInstagramFirstCommentModal: true,
        firstCommentIds: action.ids,
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
    case actionTypes.SAVE_MODAL_TO_SHOW_LATER:
      return {
        ...state,
        modalToShowLater: {
          id: action.modalId,
          params: action.params,
        },
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
    case actionTypes.HIDE_CLOSE_COMPOSER_CONFIRMATION_MODAL:
      return {
        ...state,
        showCloseComposerConfirmationModal: false,
      };
    case actionTypes.SHOW_CLOSE_COMPOSER_CONFIRMATION_MODAL:
      return {
        ...state,
        showCloseComposerConfirmationModal: true,
        page: action.page,
      };
    case actionTypes.HIDE_DELETE_CAMPAIGN_MODAL:
      return {
        ...state,
        showDeleteCampaignModal: false,
      };
    case actionTypes.SHOW_DELETE_CAMPAIGN_MODAL:
      return {
        ...state,
        showDeleteCampaignModal: true,
      };
    default:
      return state;
  }
};

export const actions = {
  showSwitchPlanModal: ({ plan, source, isPromo }) => ({
    type: actionTypes.SHOW_SWITCH_PLAN_MODAL,
    plan,
    source,
    isPromo,
  }),
  hideUpgradeModal: () => ({
    type: actionTypes.HIDE_SWITCH_PLAN_MODAL,
  }),
  showTrialCompleteModal: () => ({
    type: actionTypes.SHOW_TRIAL_COMPLETE_MODAL,
  }),
  hideTrialCompleteModal: () => ({
    type: actionTypes.HIDE_TRIAL_COMPLETE_MODAL,
  }),
  showInstagramFirstCommentModal: ({ ids }) => ({
    type: actionTypes.SHOW_INSTAGRAM_FIRST_COMMENT_MODAL,
    ids,
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
  saveModalToShowLater: ({ modalId, profileId }) => ({
    type: actionTypes.SAVE_MODAL_TO_SHOW_LATER,
    modalId,
    params: {
      profileId,
    },
  }),
  hideCloseComposerConfirmationModal: () => ({
    type: actionTypes.HIDE_CLOSE_COMPOSER_CONFIRMATION_MODAL,
  }),
  showCloseComposerConfirmationModal: ({ page }) => ({
    type: actionTypes.SHOW_CLOSE_COMPOSER_CONFIRMATION_MODAL,
    page,
  }),
  hideDeleteCampaignModal: () => ({
    type: actionTypes.HIDE_DELETE_CAMPAIGN_MODAL,
  }),
  showDeleteCampaignModal: campaign => ({
    type: actionTypes.SHOW_DELETE_CAMPAIGN_MODAL,
    campaign,
  }),
  isShowingModals: ({ modals }) => {
    return (
      modals &&
      (modals.showProfilesDisconnectedModal ||
        modals.showSwitchPlanModal ||
        modals.showInstagramFirstCommentModal ||
        modals.showStealProfileModal ||
        modals.showTrialCompleteModal ||
        modals.showInstagramFirstCommentProTrialModal ||
        modals.showCloseComposerConfirmationModal ||
        false)
    );
  },
};
