import { connect } from 'react-redux';

import ThirdParty from './components/Loader';

export default connect(state => ({
  appCues: state.thirdparty.appCues,
  intercom: state.thirdparty.intercom,
  helpScoutBeacon: state.thirdparty.helpScoutBeacon,
}))(ThirdParty);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
