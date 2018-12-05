import { connect } from 'react-redux';
import AnalyticsList from './components/AnalyticsList';

export default connect(
  state => ({
    profileService: state.profileSidebar.selectedProfile ?
      state.profileSidebar.selectedProfile.service :
      null,
  }),
)(AnalyticsList);
