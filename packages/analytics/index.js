import { connect } from 'react-redux';
import Analytics from './components/Analytics';

export default connect(state => ({
  profile: state.profileSidebar.selectedProfile,
  isLockedProfile: state.profileSidebar.isLockedProfile,
  isBusinessAccount: state.profileSidebar.selectedProfile.business,
  isInstagramBusiness: state.profileSidebar.selectedProfile.isInstagramBusiness,
  isAnalyticsSupported:
    state.profileSidebar.selectedProfile.isAnalyticsSupported,
  //  TODO: Refactor so we're not pulling this state from drafts
  canStartBusinessTrial: state.drafts.canStartBusinessTrial,
}))(Analytics);
