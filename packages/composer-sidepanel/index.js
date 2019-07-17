import { connect } from 'react-redux';
import ComposerSidepanel from './components/ComposerSidepanel';

export default connect(
  state => ({
    userData: state.appSidebar.user,
    profile: state.profileSidebar,
  }),
)(ComposerSidepanel);
