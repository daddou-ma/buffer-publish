import { connect } from 'react-redux';
import { actions } from './reducer';

import BillingUpdateCTABanner from './components/BillingUpgradeCTABanner';

export default connect(
  state => ({
    trial: state.user?.trial,
    canSeeBillingInfo: state.user.canSeeBillingInfo,
    isPremiumBusinessPlan: state.user.plan === 'premium_business',
    profileCount: state.user.profileCount,
  }),
  dispatch => ({
    onClickStartSubscription: () => {
      dispatch(actions.handleStartSubscription());
    },
  })
)(BillingUpdateCTABanner);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
