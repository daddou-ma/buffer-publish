import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as modalsActions } from '@bufferapp/publish-modals';
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
      campaignId: state?.campaign?.campaignId || ownProps?.match?.params?.id,
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
    onDeleteCampaignClick: campaignId => {
      dispatch(actions.handleDeleteCampaignClick(campaignId));
    },
    goToAnalyzeReport: () => {
      window.location.assign(`${getURL.getAnalyzeReportUrl()}`);
    },
    onEditCampaignClick: campaignId => {
      if (campaignId) {
        dispatch(push(`/campaigns/${campaignId}/edit`));
      }
    },
    fetchCampaign: ({ campaignId, past }) => {
      dispatch(actions.fetchCampaign({ campaignId, past, fullItems: true }));
    },
  })
)(ViewCampaign);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
