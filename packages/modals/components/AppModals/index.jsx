import React from 'react';
import PropTypes from 'prop-types';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';
import WelcomeModal from '@bufferapp/publish-welcome-modal';
import WelcomePaidModal from '@bufferapp/publish-welcome-paid-modal';
import ProfilesDisconnectedModal from '@bufferapp/publish-profiles-disconnected-modal';

const AppModals = ({ showUpgradeModal, showWelcomeModal, showWelcomePaidModal, showProfilesDisconnectedModal }) => (
  <React.Fragment>
    {showUpgradeModal && <UpgradeModal />}
    {showWelcomeModal && <WelcomeModal />}
    {showWelcomePaidModal && <WelcomePaidModal />}
    {showProfilesDisconnectedModal && <ProfilesDisconnectedModal />}
  </React.Fragment>
);

AppModals.propTypes = {
  showUpgradeModal: PropTypes.bool.isRequired,
  showWelcomeModal: PropTypes.bool.isRequired,
  showWelcomePaidModal: PropTypes.bool.isRequired,
  showProfilesDisconnectedModal: PropTypes.bool.isRequired,
};

export default AppModals;
