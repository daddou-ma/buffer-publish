import { connect } from 'react-redux';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { profileTabPages } from '@bufferapp/publish-routes';
import InstagramNotification from './components/InstagramPersonalProfileNotification';

export default connect(
  state => ({
    profileId: state.profileSidebar.selectedProfileId,
    tabId: state.tabs.tabId,
  }),
  dispatch => ({
    onDirectPostingClick: ({ profileId, tabId }) => {
      if (tabId !== 'queue') {
        dispatch(
          profileTabPages.goTo({
            profileId,
            tabId: 'queue',
          })
        );
      }
      dispatch(
        dataFetchActions.fetch({
          name: 'checkInstagramBusiness',
          args: {
            profileId,
            callbackAction: modalsActions.showInstagramDirectPostingModal({
              profileId,
            }),
          },
        })
      );
    },
  })
)(InstagramNotification);
