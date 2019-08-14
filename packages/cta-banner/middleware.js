import { actions as modalsActions } from '@bufferapp/publish-modals';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import { actionTypes } from '.';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  const { user } = getState().appSidebar;
  next(action);

  switch (action.type) {
    case actionTypes.START_SUBSCRIPTION:
      if (user && user.is_business_user) {
        openBillingWindow();
      } else {
        dispatch(modalsActions.showUpgradeModal({ source: 'cta_banner_upgrade' }));
      }
      break;
    default:
      break;
  }
};
