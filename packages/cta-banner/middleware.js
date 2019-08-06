import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actionTypes } from '.';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.MANAGE_BILLING:
    case actionTypes.ADD_BILLING:
      // openBillingWindow();
      dispatch(modalsActions.showUpgradeModal({ source: 'cta_banner_upgrade' }));
      break;
    default:
      break;
  }
};
