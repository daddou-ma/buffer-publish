import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import AnalyticsList from './components/AnalyticsList';

export default connect(
  state => ({
    profile: state.profileSidebar.selectedProfile,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isAnalyticsSupported: state.profileSidebar.selectedProfile ?
      state.profileSidebar.selectedProfile.isAnalyticsSupported :
      null,
    // TODO: Refactor so we're not pulling this state from drafts
    canStartBusinessTrial: state.drafts.canStartBusinessTrial,
  }),
  dispatch => ({
    onClickUpgradeToPro: () => {
      dispatch(modalsActions.showUpgradeModal({ source: 'locked_profile' }));
    },
  }),
)(AnalyticsList);
