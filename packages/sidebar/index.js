import { connect } from 'react-redux';

import Sidebar from './components/Sidebar';

export default connect(
  state => ({
    userFeatures: state.appSidebar.user.features,
  }),
  dispatch => ({
    onReturnToClassicClick() {
      dispatch({
        type: 'MODAL_RETURN_TO_CLASSIC',
        source: 'publish_sidebar',
      });
    },
  }),

)(Sidebar);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
