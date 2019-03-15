import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import AnalyticsList from './components/AnalyticsList';

export default connect(
  state => ({
    profile: state.profileSidebar.selectedProfile,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    profileLimit: state.appSidebar.user.profile_limit,
    isOwner: null, // TO DO
    isAnalyticsSupported: state.profileSidebar.selectedProfile ?
      state.profileSidebar.selectedProfile.isAnalyticsSupported :
      null,
    // TODO: Refactor so we're not pulling this state from drafts
    canStartBusinessTrial: state.drafts.canStartBusinessTrial,
  }),
  dispatch => ({
    onClickUpgrade: (plan) => {
      if (plan === 'free') {
        dispatch(modalsActions.showUpgradeModal({ source: 'locked_profile' }));
      } else {
        openBillingWindow();
      }
    },
  }),
)(AnalyticsList);
