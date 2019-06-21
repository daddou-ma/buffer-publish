import { connect } from 'react-redux';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';

import LockedProfileNotification from './components/LockedProfileNotification';
import { actions } from './reducer';

export default connect(
  state => ({
    profileLimit: state.appSidebar.user.profile_limit,
    isOwner: state.appSidebar.user.id === state.profileSidebar.selectedProfile.ownerId,
  }),
  dispatch => ({
    onClickUpgrade: (plan) => {
      dispatch(actions.upgrade(plan));
      if (plan !== 'free') {
        openBillingWindow();
      }
    },
  }),
)(LockedProfileNotification);

export reducer, { actions, actionTypes } from './reducer';
