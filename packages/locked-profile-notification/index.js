import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';

import LockedProfileNotification from './components/LockedProfileNotification';

export default connect(
  state => ({
    profileLimit: state.appSidebar.user.profile_limit,
    isOwner: state.appSidebar.user.id === state.profileSidebar.selectedProfile.ownerId,
  }),
  dispatch => ({
    onClickUpgrade: (plan) => {
      if (plan === 'free') {
        dispatch(modalsActions.showUpgradeModal({ source: 'locked_profile' }));
      } else {
        openBillingWindow();
      }
    },
  }),
)(LockedProfileNotification);
