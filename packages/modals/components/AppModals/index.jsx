import React from 'react';
import PropTypes from 'prop-types';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';
import WelcomeModal from '@bufferapp/publish-welcome-modal';
import StealProfileModal from '@bufferapp/publish-steal-profile-modal';
import ProfilesDisconnectedModal from '@bufferapp/publish-profiles-disconnected-modal';

const AppModals = ({
  showUpgradeModal,
  showWelcomeModal,
  showProfilesDisconnectedModal,
  showStealProfileModal,
}) => (
  <React.Fragment>
    {showUpgradeModal && <UpgradeModal />}
    {showWelcomeModal && <WelcomeModal />}
    {showProfilesDisconnectedModal && <ProfilesDisconnectedModal />}
    {showStealProfileModal && <StealProfileModal />}
  </React.Fragment>
);

AppModals.propTypes = {
  showUpgradeModal: PropTypes.bool.isRequired,
  showWelcomeModal: PropTypes.bool.isRequired,
  showProfilesDisconnectedModal: PropTypes.bool.isRequired,
  showStealProfileModal: PropTypes.bool.isRequired,
};

export default AppModals;
