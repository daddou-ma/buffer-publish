import { connect } from 'react-redux';
import { actions } from './reducer';

import CampaignsPage from './components/CampaignsPage';

export default connect(
  state => ({
    campaigns: [],
    translations: state.i18n.translations.campaigns,
    hasCampaignsFlip: state.appSidebar.user.features
      ? state.appSidebar.user.features.includes('campaigns')
      : false,
  }),
  dispatch => ({
    onCreateCampaignClick: ({ colorSelected, name }) => {
      dispatch(
        actions.handleCreateCampaignClick({ name, color: colorSelected })
      );
    },
  })
)(CampaignsPage);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
