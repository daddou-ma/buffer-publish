import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import AnalyticsList from './components/AnalyticsList';

export default connect(
  state => ({
    profile: state.profileSidebar.selectedProfile,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isBusinessAccount: state.profileSidebar.selectedProfile.business,
    isAnalyticsSupported: state.profileSidebar.selectedProfile.isAnalyticsSupported,
    // TODO: Refactor so we're not pulling this state from drafts
    canStartBusinessTrial: state.drafts.canStartBusinessTrial,
  }),
  dispatch => ({
    onClickUpgrade: (plan) => {
      if (plan === 'free') {
        dispatch(modalsActions.showUpgradeModal({ source: 'locked_profile' }));
      } else if (plan === 'pro') {
        openBillingWindow();
      }
    },
  }),
)(AnalyticsList);
