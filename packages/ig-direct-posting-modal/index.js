import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions as generalSettingsActions } from '@bufferapp/publish-general-settings';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
// load the presentational component
import InstagramDirectPostingModal from './components/InstagramDirectPostingModal';

export default connect(
  state => ({
    translations: state.i18n.translations['instagram-direct-posting-modal'],
    profileId: state.profileSidebar.selectedProfileId,
    isBusinessOnInstagram: state.queue.isBusinessOnInstagram,
  }),
  (dispatch, ownProps) => ({
    onHideInstagramModal: () => dispatch(modalsActions.hideInstagramDirectPostingModal()),
    onSetUpDirectPostingClick: () => {
      dispatch(generalSettingsActions.handleSetUpDirectPostingClick({
        profileId: ownProps.profileId,
      }));
    },
    onCheckInstagramBusinessClick: () => {
      dispatch(dataFetchActions.fetch({
        name: 'checkInstagramBusiness',
        args: {
          profileId: ownProps.profileId,
          recheck: true,
        },
      }));
    },
  }),
)(InstagramDirectPostingModal);
