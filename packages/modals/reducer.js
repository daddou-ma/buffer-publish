import keyWrapper from '@bufferapp/keywrapper';

export const initialState = {
  showUpgradeModal: false,
  upgradeModalSource: null,
};

export const actionTypes = keyWrapper('MODALS', {
  SHOW_UPGRADE_MODAL: 0,
  HIDE_UPGRADE_MODAL: 0,
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
};
