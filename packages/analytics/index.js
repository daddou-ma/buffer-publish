import { connect } from 'react-redux';
import AnalyticsList from './components/AnalyticsList';

export default connect(
  state => ({
    isAnalyticsSupported: state.profileSidebar.selectedProfile ?
      state.profileSidebar.selectedProfile.isAnalyticsSupported :
      null,
  }),
)(AnalyticsList);
