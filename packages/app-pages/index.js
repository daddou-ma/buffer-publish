import { connect } from 'react-redux';

import AppPages from './components/AppPages';

export default connect(state => ({
  profiles: state.publishProfiles,
  hasProfiles: state.publishProfiles.length > 0,
  isOnBusinessTrial: state.user.isOnBusinessTrial,
}))(AppPages);
