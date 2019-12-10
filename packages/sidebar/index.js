import { connect } from 'react-redux';

import Sidebar from './components/Sidebar';

export default connect(state => ({
  userFeatures: state.appSidebar.user.features,
}))(Sidebar);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
