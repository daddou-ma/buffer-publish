import React from 'react';
import PropTypes from 'prop-types';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';
import WelcomeModal from '@bufferapp/publish-welcome-modal';

const AppModals = ({ showUpgradeModal, showWelcomeModal }) => (
  <React.Fragment>
    {showUpgradeModal && <UpgradeModal />}
    {showWelcomeModal && <WelcomeModal />}
  </React.Fragment>
);

AppModals.propTypes = {
  showUpgradeModal: PropTypes.bool.isRequired,
  showWelcomeModal: PropTypes.bool.isRequired,
};

export default AppModals;
