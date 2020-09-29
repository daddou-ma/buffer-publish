import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions as campaignActions } from '@bufferapp/publish-campaign/reducer';
import {
  campaignEdit,
  campaignCreate,
  campaignScheduled,
} from '@bufferapp/publish-routes';
import ListCampaigns from './components/ListCampaigns';

export default connect(
  state => {
    return {
      campaigns: state.campaignsList.campaigns,
      showCampaignActions: state.organizations.selected?.canModifyCampaigns,
      hideAnalyzeReport: !state.organizations.selected?.canSeeCampaignsReport,
      isLoading: state.campaignsList.isLoading,
      hasCampaignsFlip: state.organizations.selected?.hasCampaignsFeature,
      ownerEmail: state.organizations.selected?.ownerEmail,
      shouldDisplayLockedCopy: state.organizations.selected?.locked,
    };
  },
  (dispatch, ownProps) => ({
    onViewCampaignClick: ({ campaignId }) => {
      if (campaignId) {
        dispatch(campaignScheduled.goTo({ campaignId }));
      }
    },
    onOpenCreateCampaignClick: () => {
      dispatch(campaignCreate.goTo());
    },
    onDeleteCampaignClick: campaign => {
      dispatch(modalsActions.showDeleteCampaignModal(campaign));
    },
    goToAnalyzeReport: campaign => {
      dispatch(campaignActions.goToAnalyzeReport(campaign));
    },
    onEditCampaignClick: ({ campaignId }) => {
      if (campaignId) {
        dispatch(
          campaignEdit.goTo({
            campaignId,
            from: ownProps.history.location.pathname,
          })
        );
      }
    },
  })
)(ListCampaigns);

export reducer from './reducer';
export middleware from './middleware';
