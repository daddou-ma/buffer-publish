import { push } from 'react-router-redux';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
import ProfileSidebar from './components/ProfileSidebar';
import { actions } from './reducer';

const { formatAnalyticsProfileObj, canUserViewAnalytics } = require('./analytics');

export default connect(
  (state, ownProps) => ({
    loading: state.profileSidebar.loading,
    selectedProfile: state.profileSidebar.selectedProfile,
    selectedProfileId: ownProps.profileId,
    profiles: state.profileSidebar.profiles,
    lockedProfiles: state.profileSidebar.lockedProfiles,
    translations: state.i18n.translations['profile-sidebar'],
    profileLimit: state.appSidebar.user.profile_limit,
  }),
  (dispatch, ownProps) => ({
    onProfileClick: (profile) => {
      if (profile.id !== ownProps.profileId) {
        dispatch(push(generateProfilePageRoute({
          profileId: profile.id,
          tabId: ownProps.tabId,
        })));
        dispatch(actions.selectProfile({
          profile,
        }));
        if (canUserViewAnalytics(profile)) {
          // need to match analyze action to fetch data for new selected profile
          dispatch({
            type: 'PROFILE_SELECTOR__SELECT_PROFILE',
            profile: formatAnalyticsProfileObj(profile),
          });
        }
      }
    },
    onConnectSocialAccountClick: () => {
      dispatch(actions.handleConnectSocialAccountClick());
    },
  }),
)(ProfileSidebar);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
