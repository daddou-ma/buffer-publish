import { connect } from 'react-redux';

import InitialLoading from './components/InitialLoading';

export default connect(state => ({
  hasPublishBeta: state.initialLoading.hasPublishBeta,
  hasNewPublish: state.initialLoading.hasNewPublish,
  loading: state.initialLoading.loading,
  onPaydayPage: state.initialLoading.onPaydayPage,
}))(InitialLoading);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
