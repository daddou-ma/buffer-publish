import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
  getCampaignPageParams,
  campaignsCreateRoute,
} from '@bufferapp/publish-routes';
import { actions } from './reducer';
import CampaignsPage from './components/CampaignsPage';

/*
campaignId: state.campaigns.campaignId,
campaignPage: state.campaigns.campaignPage,
*/

export default connect(
  (state, ownProps) => {
    const { campaignId, campaignPage = 'campaigns' } =
      getCampaignPageParams({ path: ownProps.history.location.pathname }) || {};
    return {
      campaigns: [],
      translations: state.i18n.translations.campaigns,
      isOwner:
        state.appSidebar.user.id ===
        state.profileSidebar.selectedProfile.ownerId,
      isSaving: state.campaigns.isSaving,
      campaignId,
      campaignPage,
      selectedCampaignId: campaignId,
      hasCampaignsFlip: state.appSidebar.user.features
        ? state.appSidebar.user.features.includes('campaigns')
        : false,
    };
  },
  dispatch => ({
    /*
    onOpenCreateCampaignClick: () => {
      dispatch(push(campaignsCreateRoute));
    },
    */
    onCreateCampaignClick: ({ colorSelected, campaignName }) => {
      dispatch(
        actions.handleCreateCampaignClick({
          name: campaignName,
          color: colorSelected,
        })
      );
    },
    onCreatePostClick: campaignId => {
      dispatch(actions.handleOpenComposer(campaignId));
    },
    onDeleteCampaignClick: campaignId => {
      dispatch(actions.handleDeleteCampaignClick(campaignId));
    },
    onEditCampaignClick: campaignId => {
      dispatch(actions.handleEditCampaignClick(campaignId));
    },
  })
)(CampaignsPage);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';