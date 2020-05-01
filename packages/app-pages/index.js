import { connect } from 'react-redux';

import AppPages from './components/AppPages';

export default connect(state => ({
  profiles: state.profileSidebar.profiles,
  isOnBusinessTrial: state.user.isOnBusinessTrial,
}))(AppPages);
