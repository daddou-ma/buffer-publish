import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar/reducer';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import getCtaProperties from '@bufferapp/publish-analytics-middleware/utils/CtaStrings';
import Plans from './components/Plans';
import { getPlanId } from './utils/plans';

export default connect(
  state => ({
    currentPlan: state.appSidebar.user.plan,
    profiles: state.profileSidebar.profiles,
    selectedProfileId: state.profileSidebar.selectedProfileId,
    translations: state.i18n.translations['plans-page'],
    isNonprofit: state.appSidebar.user.isNonprofit,
    isExperimentControl: state.appSidebar.user.hasPaydayExperimentControlFlip,
  }),
  dispatch => ({
    onChoosePlanClick: ({ source, plan }) => {
      const ctaProperties = getCtaProperties(SEGMENT_NAMES.PLANS_OPEN_MODAL);
      const metadata = {
        product: 'publish',
        planName: plan,
        planId: getPlanId(plan),
        ...ctaProperties,
      };
      dispatch(analyticsActions.trackEvent('Modal Payment Opened', metadata));
      dispatch(modalsActions.showSwitchPlanModal({ source, plan }));
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
