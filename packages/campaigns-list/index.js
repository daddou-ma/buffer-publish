import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as campaignActions } from '@bufferapp/publish-campaign';
import { actions } from './reducer';
import ListCampaigns from './components/ListCampaigns';

export default connect(
  state => {
    return {
      campaigns: state.campaignsList.campaigns,
      translations: state.i18n.translations.campaigns,
      isUsingPublishAsTeamMember:
        state.appSidebar.user.isUsingPublishAsTeamMember,
      isLoading: state.campaignsList.isLoading,
      hasCampaignsFlip: state.appSidebar.user.features
        ? state.appSidebar.user.features.includes('campaigns')
        : false,
    };
  },
  dispatch => ({
    onViewCampaignClick: campaignId => {
      if (campaignId) {
        dispatch(push(`/campaigns/${campaignId}/scheduled`));
      }
    },
    onOpenCreateCampaignClick: () => {
      dispatch(push(`/campaigns/new`));
    },
    onDeleteCampaignClick: campaignId => {
      dispatch(campaignActions.handleDeleteCampaignClick(campaignId));
    },
    goToAnalyzeReport: () => {
      window.location.assign(`${getURL.getAnalyzeReportUrl()}`);
    },
    onEditCampaignClick: campaignId => {
      if (campaignId) {
        dispatch(push(`/campaigns/${campaignId}/edit`));
      }
    },
    fetchCampaigns: () => {
      dispatch(actions.fetchCampaigns());
    },
  })
)(ListCampaigns);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
