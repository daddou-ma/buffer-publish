import { connect } from 'react-redux';
import { actions } from './reducer';

import BillingUpdateCTABanner from './components/BillingUpgradeCTABanner';

export default connect(
  state => ({
    trial: state.appSidebar.user && state.appSidebar.user.trial,
    isPremiumBusinessPlan: state.appSidebar.user.plan === 'premium_business',
    translations: state.i18n.translations['billing-upgrade-cta-banner'],
    profileCount: state.ctaBanner.profileCount,
  }),
  dispatch => ({
    onClickStartSubscription: () => {
      dispatch(actions.handleStartSubscription());
    },
  })
)(BillingUpdateCTABanner);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
