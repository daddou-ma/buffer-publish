import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
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
        window.location.assign(
          `${getURL.getBillingURL({
            cta: SEGMENT_NAMES.CTA_BANNER_BUSINESS_UPGRADE,
          })}`
        );
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
