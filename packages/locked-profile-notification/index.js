import { connect } from 'react-redux';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';

import LockedProfileNotification from './components/LockedProfileNotification';
import { actions } from './reducer';

export default connect(
  state => ({
    profileLimit: state.user.profileLimit,
    isOwner: state.user.id === state.profileSidebar.selectedProfile.ownerId,
  }),
  dispatch => ({
    onClickUpgrade: plan => {
      if (plan === 'free') {
        dispatch(actions.upgrade(plan));
      } else {
        window.location.assign(
          `${getURL.getBillingURL({
            cta: SEGMENT_NAMES.LOCKED_PROFILE_BUSINESS_UPGRADE,
          })}`
        );
      }
    },
  })
)(LockedProfileNotification);

export reducer, { actions, actionTypes } from './reducer';
