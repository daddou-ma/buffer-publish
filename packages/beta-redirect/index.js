import { connect } from 'react-redux';

import EnsurePublishBetaUser from './components/EnsurePublishBetaUser';

export default connect(
  state => ({
    hasPublishBeta: state.betaRedirect.hasPublishBeta,
    hasNewPublish: state.betaRedirect.hasNewPublish,
    loading: state.betaRedirect.loading,
  }),
)(EnsurePublishBetaUser);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
