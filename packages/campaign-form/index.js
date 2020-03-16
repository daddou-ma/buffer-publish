import { connect } from 'react-redux';
import { actions as campaignActions } from '@bufferapp/publish-campaign';
import { campaignsPage } from '@bufferapp/publish-routes';
import { actions } from './reducer';
import CampaignForm from './components/CampaignForm';

export default connect(
  (state, ownProps) => {
    return {
      campaign: state.campaignForm.campaign,
      translations: state.i18n.translations.campaigns.createCampaign,
      isLoading: state.campaignForm.isLoading,
      editMode: ownProps.editMode,
      campaignId:
        state?.campaignForm?.campaignId || ownProps?.match?.params?.id,
      hasCampaignsFlip: state.appSidebar.user.features
        ? state.appSidebar.user.features.includes('campaigns')
        : false,
    };
  },
  dispatch => ({
    onCancelCreateCampaignClick: () => {
      dispatch(campaignsPage.goTo());
    },
    onCreateCampaignClick: ({ colorSelected, campaignName }) => {
      dispatch(
        actions.handleCreateCampaignClick({
          name: campaignName,
          color: colorSelected,
        })
      );
    },
    fetchCampaign: ({ campaignId }) => {
      dispatch(campaignActions.fetchCampaign({ campaignId }));
    },
  })
)(CampaignForm);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
