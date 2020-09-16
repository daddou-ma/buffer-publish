import { connect } from 'react-redux';
import { actions } from './reducer';

import BillingUpdateCTABanner from './components/BillingUpgradeCTABanner';

export default connect(
  state => ({
    trial: state.user?.trial,
    plan: state.organizations?.selected.plan,
    planBase: state.organizations?.selected.planBase,
    canSeeBillingInfo: state.user.canSeeBillingInfo,
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
