import { connect } from 'react-redux';

import InitialLoading from './components/InitialLoading';

export default connect(state => ({
  hasPublishBeta: state.initialLoading.hasPublishBeta,
  hasNewPublish: state.initialLoading.hasNewPublish,
  loading: state.initialLoading.loading,
  onPaydayPage: state.initialLoading.onPaydayPage,
  hasCampaignsFlip: state.initialLoading.hasCampaignsFlip,
}))(InitialLoading);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
