import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar/reducer';
import Plans from './components/Plans';

import { actions } from './reducer';

const getClassicBufferURL = () => {
  if (window.location.hostname === 'publish.local.buffer.com') {
    return 'https://local.buffer.com/app';
  }
  return 'https://buffer.com/app';
};

export default connect(
  state => ({
    currentPlan: state.appSidebar.user.plan,
    profiles: state.profileSidebar.profiles,
    selectedProfileId: state.profileSidebar.selectedProfileId,
    translations: state.i18n.translations['plans-page'],
    isNonprofit: state.appSidebar.user.isNonprofit,
    selectedPremiumPlan: state.plans.selectedPremiumPlan,
    isAwesomePromoUser:
      state.appSidebar.user.isAwesomePromoUser &&
      state.appSidebar.user.isOnAwesomePlan,
    shouldSeeSoloPlanOption: state.appSidebar.user.plan === 'pro',
  }),
  dispatch => ({
    onPremiumPlanClick: ({ selectedPlan }) => {
      dispatch(actions.setSelectedPlan({ selectedPlan }));
    },
    onChoosePlanClick: ({ source, plan, soloPlanSelected, isPromo }) => {
      if (plan === 'premium_business' && soloPlanSelected) {
        plan = 'solo_premium_business';
      }
      dispatch(modalsActions.showSwitchPlanModal({ source, plan, isPromo }));
    },
    onBackToDashboardClick: ({
      selectedProfileId,
      profiles,
      isAwesomeUser,
    }) => {
      if (isAwesomeUser) {
        window.location.replace(getClassicBufferURL());
        return;
      }
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
