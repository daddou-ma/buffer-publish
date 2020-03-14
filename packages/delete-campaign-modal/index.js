import { connect } from 'react-redux';
import { actions as modalActions } from '@bufferapp/publish-modals/reducer';
import DeleteCampaignModal from './components/DeleteCampaignModal';
import { actions } from './reducer';

export default connect(
  state => ({
    translations: state.i18n.translations.campaigns.deleteCampaignModal,
    loading: state.deleteCampaignModal.loading,
    campaignId: state.deleteCampaignModal.campaignId,
    username: state.appSidebar.user.name,
  }),
  dispatch => ({
    hideModal: () => dispatch(modalActions.hideDeleteCampaignModal()),
    deleteCampaign: () => dispatch(actions.deleteCampaign()),
  })
)(DeleteCampaignModal);
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';