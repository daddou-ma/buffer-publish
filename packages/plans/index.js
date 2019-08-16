import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import Plans from './components/Plans';

export default connect(
  state => ({
    currentPlan: state.appSidebar.user.plan,
    profiles: state.profileSidebar.profiles,
    selectedProfileId: state.profileSidebar.selectedProfileId,
    translations: state.i18n.translations['plans-page'],
  }),
  dispatch => ({
    onChoosePlanClick: ({ source, plan }) => {
      dispatch(modalsActions.showUpgradeModal({ source, plan }));
    },
    onBackToDashboardClick: ({ selectedProfileId, profiles }) => {
      if (profiles.length > 0) {
        const profileId = selectedProfileId || profiles[0].id;
        const profile = profiles.find(p => p.id === profileId);
        dispatch(profileSidebarActions.selectProfile({
          profile,
        }));
        dispatch(push(generateProfilePageRoute({
          profileId,
        })));
      } else {
        dispatch(push('/'));
      }
    },
  }),
)(Plans);
