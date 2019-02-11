import keyWrapper from '@bufferapp/keywrapper';

export const initialState = {
  showUpgradeModal: false,
  showWelcomeModal: false,
  showWelcomePaidModal: false,
  showProfilesDisconnectedModal: false,
  upgradeModalSource: null,
  showStealProfileModal: false,
  stealProfileUsername: null,
};

export const actionTypes = keyWrapper('MODALS', {
  SHOW_UPGRADE_MODAL: 0,
  HIDE_UPGRADE_MODAL: 0,
  SHOW_WELCOME_MODAL: 0,
  HIDE_WELCOME_MODAL: 0,
  SHOW_WELCOME_PAID_MODAL: 0,
  HIDE_WELCOME_PAID_MODAL: 0,
  SHOW_PROFILES_DISCONNECTED_MODAL: 0,
  HIDE_PROFILES_DISCONNECTED_MODAL: 0,
  SHOW_STEAL_PROFILE_MODAL: 0,
  HIDE_STEAL_PROFILE_MODAL: 0,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_UPGRADE_MODAL:
      return {
        ...state,
        showUpgradeModal: true,
        upgradeModalSource: action.source,
      };
    case actionTypes.HIDE_UPGRADE_MODAL:
      return {
        ...state,
        showUpgradeModal: false,
      };
    case actionTypes.SHOW_WELCOME_MODAL:
      return {
        ...state,
        showWelcomeModal: true,
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
    default:
      return state;
  }
};

export const actions = {
  showUpgradeModal: ({ source }) => ({
    type: actionTypes.SHOW_UPGRADE_MODAL,
    source,
  }),
  hideUpgradeModal: () => ({
    type: actionTypes.HIDE_UPGRADE_MODAL,
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
};
