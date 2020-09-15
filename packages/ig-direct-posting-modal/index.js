import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
// load the presentational component
import InstagramDirectPostingModal from './components/InstagramDirectPostingModal';
import { actions } from './reducer';

export default connect(
  state => ({
    profileId: state.profileSidebar.selectedProfileId,
    isBusinessOnInstagram: state.queue.isBusinessOnInstagram,
  }),
  dispatch => ({
    onHideInstagramModal: () =>
      dispatch(modalsActions.hideInstagramDirectPostingModal()),
    onSetUpDirectPostingClick: profileId => {
      dispatch(
        actions.handleSetUpDirectPostingClick({
          profileId,
        })
      );
    },
    onCheckInstagramBusinessClick: profileId => {
      dispatch(
        dataFetchActions.fetch({
          name: 'checkInstagramBusiness',
          args: {
            profileId,
            recheck: true,
          },
        })
      );
    },
  })
)(InstagramDirectPostingModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
