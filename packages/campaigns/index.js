import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
  getCampaignPageParams,
  campaignsCreateRoute,
  campaignsPageRoute,
  campaignPages,
} from '@bufferapp/publish-routes';
import { actions } from './reducer';
import CampaignsPage from './components/CampaignsPage';

export default connect(
  (state, ownProps) => {
    const { campaignId, selectedPage = campaignPages.VIEW_ALL_CAMPAIGNS } =
      getCampaignPageParams({ path: ownProps.history.location.pathname }) || {};
    return {
      campaigns: [],
      translations: state.i18n.translations.campaigns,
      isUsingPublishAsTeamMember:
        state.appSidebar.user.isUsingPublishAsTeamMember,
      isSaving: state.campaigns.isSaving,
      campaignId,
      campaignDetails: state.campaigns.campaignDetails,
      selectedPage,
      hasCampaignsFlip: state.appSidebar.user.features
        ? state.appSidebar.user.features.includes('campaigns')
        : false,
    };
  },
  dispatch => ({
    onOpenCreateCampaignClick: () => {
      dispatch(push(campaignsCreateRoute));
    },
    onCancelCreateCampaignClick: () => {
      dispatch(push(campaignsPageRoute));
    },
    onCreateOrUpdateCampaignClick: ({
      campaignId,
      colorSelected,
      campaignName,
    }) => {
      if (campaignId) {
        dispatch(
          actions.handleEditCampaignClick({
            id: campaignId,
            name: campaignName,
            color: colorSelected,
          })
        );
      } else {
        dispatch(
          actions.handleCreateCampaignClick({
            name: campaignName,
            color: colorSelected,
          })
        );
      }
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
