import { connect } from 'react-redux';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { campaignEdit } from '@bufferapp/publish-routes';
import { actions } from './reducer';
import ViewCampaign from './components/ViewCampaign';

export default connect(
  (state, ownProps) => {
    return {
      campaign: state.campaign.campaign,
      showComposer: state.campaign.showComposer,
      translations: state.i18n.translations.campaigns.viewCampaign,
      isUsingPublishAsTeamMember:
        state.appSidebar.user.isUsingPublishAsTeamMember,
      isLoading: state.campaign.isLoading,
      campaignId: state.campaign?.campaignId || ownProps.match?.params?.id,
      hasCampaignsFlip: state.appSidebar.user.features
        ? state.appSidebar.user.features.includes('campaigns')
        : false,
    };
  },
  dispatch => ({
    onComposerCreateSuccess: () => {
      dispatch(actions.handleCloseComposer());
    },
    onComposerOverlayClick: () => {
      dispatch(modalsActions.showCloseComposerConfirmationModal());
    },
    onCreatePostClick: campaignId => {
      dispatch(actions.handleOpenComposer(campaignId));
    },
    onDeleteCampaignClick: campaign => {
      dispatch(modalsActions.showDeleteCampaignModal(campaign));
    },
    goToAnalyzeReport: () => {
      window.location.assign(`${getURL.getAnalyzeReportUrl()}`);
    },
    onEditCampaignClick: campaignId => {
      console.log('clicked on edit campaign');
      console.log('campaign id: ', campaignId);
      if (campaignId) {
        dispatch(campaignEdit.goTo({ campaignId }));
      }
    },
    fetchCampaign: ({ campaignId, past }) => {
      dispatch(actions.fetchCampaign({ campaignId, past, fullItems: true }));
    },
  })
)(ViewCampaign);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
