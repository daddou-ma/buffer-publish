import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import ViewCampaign from './components/ViewCampaign';

export default connect(
  (state, ownProps) => {
    return {
      campaign: state.campaignView.campaign,
      showComposer: state.campaignView.showComposer,
      translations: state.i18n.translations.campaigns.viewCampaign,
      isUsingPublishAsTeamMember:
        state.appSidebar.user.isUsingPublishAsTeamMember,
      isLoading: state.campaignView.isLoading,
      campaignId:
        state?.campaignView?.campaignId || ownProps?.match?.params?.id,
      hasCampaignsFlip: state.appSidebar.user.features
        ? state.appSidebar.user.features.includes('campaigns')
        : false,
    };
  },
  (dispatch, ownProps) => ({
    onComposerCreateSuccess: () => {
      dispatch(actions.handleCloseComposer());
    },
    onComposerOverlayClick: () => {
      dispatch(modalsActions.showCloseComposerConfirmationModal());
    },
    onCreatePostClick: () => {
      dispatch(actions.handleOpenComposer(ownProps?.match?.params?.id));
    },
    onDeleteCampaignClick: () => {
      dispatch(actions.handleDeleteCampaignClick(ownProps?.match?.params?.id));
    },
    goToAnalyzeReport: () => {
      window.location.assign(`${getURL.getAnalyzeReportUrl()}`);
    },
    onEditCampaignClick: () => {
      if (ownProps?.match?.params?.id) {
        dispatch(push(`/campaignId/${ownProps?.match?.params?.id}/edit`));
      }
    },
    fetchCampaign: ({ campaignId, past }) => {
      dispatch(actions.fetchCampaign({ campaignId, past }));
    },
  })
)(ViewCampaign);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
