import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import AppPages from './components/AppPages';

export default withRouter(
  connect(state => ({
    profiles: state.profiles,
    hasProfiles: state.profiles.length > 0,
    isOnBusinessTrial: state.user.isOnBusinessTrial,
  }))(AppPages)
);
