import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
  generateProfilePageRoute,
  newBusinessTrialistsRoute,
  newConnection,
} from '@bufferapp/publish-routes';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar/reducer';

import Preferences from './components/Preferences';

export default connect(
  state => ({
    profiles: state.profileSidebar.profiles,
    selectedProfileId: state.profileSidebar.selectedProfileId,
    isOnBusinessTrial: state.profileSidebar.isOnBusinessTrial,
  }),
  dispatch => ({
    // go back to the last selected profile
    onBackToDashboardClick: ({
      selectedProfileId,
      profiles,
      isOnBusinessTrial,
    }) => {
      if (profiles.length > 0) {
        const profileId = selectedProfileId || profiles[0].id;
        const profile = profiles.find(p => p.id === profileId);
        dispatch(
          profileSidebarActions.selectProfile({
            profile,
          })
        );
        dispatch(
          push(
            generateProfilePageRoute({
              profileId,
            })
          )
        );
      } else if (isOnBusinessTrial) {
        dispatch(push(newBusinessTrialistsRoute));
      } else {
        dispatch(newConnection.goTo());
      }
    },
  })
)(Preferences);
