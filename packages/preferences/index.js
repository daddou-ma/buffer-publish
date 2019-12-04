import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import {
  getPreferencePageParams,
  generatePreferencePageRoute,
  generateProfilePageRoute,
  newBusinessTrialistsRoute,
  newConnectionRoute,
} from '@bufferapp/publish-routes';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar/reducer';
import { trackAction } from '@bufferapp/publish-data-tracking';

import Preferences from './components/Preferences';

export default connect(
  (state, ownProps) => {
    const { preferenceId } =
      getPreferencePageParams({ path: ownProps.history.location.pathname }) ||
      {};
    return {
      profiles: state.profileSidebar.profiles,
      selectedTabId: preferenceId,
      selectedProfileId: state.profileSidebar.selectedProfileId,
      isOnBusinessTrial: state.profileSidebar.isOnBusinessTrial,
    };
  },
  dispatch => ({
    onTabClick: preferenceId => {
      trackAction({
        location: 'preferences',
        action: `click_tab_${preferenceId}`,
      });
      dispatch(
        push(
          generatePreferencePageRoute({
            preferenceId,
          })
        )
      );
    },
    // send to general when there is an unknown tab
    onUnknownTab: () =>
      dispatch(
        push(
          generatePreferencePageRoute({
            preferenceId: 'general',
          })
        )
      ),
    // go back to the last selected profile
    onBackToDashboardClick: ({
      selectedProfileId,
      profiles,
      isOnBusinessTrial,
    }) => {
      trackAction({ location: 'preferences', action: 'return_to_dashboard' });
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
        dispatch(push(newConnectionRoute));
      }
    },
  })
)(Preferences);

export constants from './constants';
