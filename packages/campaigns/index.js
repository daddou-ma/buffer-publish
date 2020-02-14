import { connect } from 'react-redux';
import { actions } from './reducer';

import CampaignsPage from './components/CampaignsPage';

export default connect(
  state => ({
    campaigns: [],
    translations: state.i18n.translations.campaigns,
    isSaving: state.campaigns.isSaving,
  }),
  dispatch => ({
    onCreateCampaignClick: ({ colorSelected, campaignName }) => {
      dispatch(
        actions.handleCreateCampaignClick({
          name: campaignName,
          color: colorSelected,
        })
      );
    },
  })
)(CampaignsPage);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
