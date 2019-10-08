import { connect } from 'react-redux';

import TemporaryDashboardBanner from './components/TemporaryDashboardBanner';

export default connect(
  state => ({
    enabledApplicationModes: state.queue.enabledApplicationModes,
    hasLinkedinProfiles: state.appSidebar.user.hasLinkedinProfiles,
  }),
)(TemporaryDashboardBanner);
