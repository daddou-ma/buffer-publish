import { connect } from 'react-redux';
import { profilePages, generic } from '@bufferapp/publish-routes';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar/reducer';

import Preferences from './components/Preferences';

export default connect(
  state => ({
    profiles: state.profileSidebar.profiles,
    selectedProfileId: state.profileSidebar.selectedProfileId,
    canSeeBillingInfo: state.organizations.selected?.canSeeBillingInfo,
  }),
  dispatch => ({
    // go back to the last selected profile
    onBackToDashboardClick: ({ selectedProfileId, profiles }) => {
      if (selectedProfileId) {
        const profile = profiles.find(p => p.id === selectedProfileId);
        dispatch(
          profileSidebarActions.selectProfile({
            profile,
          })
        );
        dispatch(
          profilePages.goTo({
            selectedProfileId,
          })
        );
      } else {
        dispatch(generic.goTo());
      }
    },
  })
)(Preferences);
