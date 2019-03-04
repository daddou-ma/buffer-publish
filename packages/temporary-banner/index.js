import { connect } from 'react-redux';
import { actions } from './reducer';

import TemporaryDashboardBanner from './components/TemporaryDashboardBanner';

export default connect(
  state => ({
    enabledApplicationModes: state.queue.enabledApplicationModes,
  }),
)(TemporaryDashboardBanner);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
