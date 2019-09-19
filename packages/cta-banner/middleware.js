import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  const { user } = getState().appSidebar;
  next(action);

  switch (action.type) {
    case actionTypes.START_SUBSCRIPTION:
      if (user && user.is_business_user) {
        openBillingWindow();
      } else {
        dispatch(modalsActions.showSwitchPlanModal({ source: 'cta_banner_upgrade', plan: 'pro' }));
      }
      break;
    default:
      break;
  }
};
