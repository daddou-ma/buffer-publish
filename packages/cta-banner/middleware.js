import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => action => {
  // eslint-disable-line
  const { organizations } = getState();
  next(action);

  switch (action.type) {
    case actionTypes.START_SUBSCRIPTION:
      if (organizations?.selected?.plan === 'premium_business') {
        dispatch(
          modalsActions.showSwitchPlanModal({
            source: 'cta_banner_upgrade_premium',
            plan: 'premium_business',
          })
        );
      } else if (organizations?.selected?.plan === 'small') {
        dispatch(
          modalsActions.showSwitchPlanModal({
            source: 'cta_banner_upgrade_small',
            plan: 'small',
          })
        );
      } else if (organizations?.selected?.planBase === 'business') {
        openBillingWindow();
      } else {
        dispatch(
          modalsActions.showSwitchPlanModal({
            source: 'cta_banner_upgrade_pro',
            plan: 'pro',
          })
        );
      }
      break;
    default:
      break;
  }
};
