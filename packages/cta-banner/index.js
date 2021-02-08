import { connect } from 'react-redux';
import { actions } from './reducer';

import BillingUpdateCTABanner from './components/BillingUpgradeCTABanner';

export default connect(
  state => ({
    trial: state.organizations?.selected?.trial,
    plan: state.organizations?.selected?.plan,
    planBase: state.organizations?.selected?.planBase,
    canSeeBillingInfo: state.organizations?.selected?.canSeeBillingInfo,
    profileCount: state.organizations?.selected?.profilesCount,
  }),
  dispatch => ({
    onClickStartSubscription: () => {
      dispatch(actions.handleStartSubscription());
    },
  })
)(BillingUpdateCTABanner);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
