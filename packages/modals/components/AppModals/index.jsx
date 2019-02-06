import React from 'react';
import PropTypes from 'prop-types';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';
import WelcomeModal from '@bufferapp/publish-welcome-modal';
import ProfilesDisconnectedModal from '@bufferapp/publish-profiles-disconnected-modal';

const AppModals = ({ showUpgradeModal, showWelcomeModal, showProfilesDisconnectedModal }) => (
  <React.Fragment>
    {showUpgradeModal && <UpgradeModal />}
    {showWelcomeModal && <WelcomeModal />}
    {showProfilesDisconnectedModal && <ProfilesDisconnectedModal />}
  </React.Fragment>
);

AppModals.propTypes = {
  showUpgradeModal: PropTypes.bool.isRequired,
  showWelcomeModal: PropTypes.bool.isRequired,
  showProfilesDisconnectedModal: PropTypes.bool.isRequired,
};

export default AppModals;
