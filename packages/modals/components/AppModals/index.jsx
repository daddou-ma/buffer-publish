import React from 'react';
import PropTypes from 'prop-types';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';
import WelcomeModal from '@bufferapp/publish-welcome-modal';
import StealProfileModal from '@bufferapp/publish-steal-profile-modal';
import ProfilesDisconnectedModal from '@bufferapp/publish-profiles-disconnected-modal';
import WelcomePaidModal from '@bufferapp/publish-welcome-paid-modal';
import InstagramFirstCommentModal from '@bufferapp/publish-instagram-first-comment-modal';
import InstagramDirectPostingModal from '@bufferapp/publish-ig-direct-posting-modal';
import WelcomeB4BTrialModal from '@bufferapp/publish-welcome-b4b-trial-modal';

const AppModals = ({
  showUpgradeModal,
  showWelcomeModal,
  showWelcomePaidModal,
  showProfilesDisconnectedModal,
  showStealProfileModal,
  showInstagramDirectPostingModal,
  showWelcomeB4BTrialModal,
  showInstagramFirstCommentModal,
}) => (
  <React.Fragment>
    {showUpgradeModal && <UpgradeModal />}
    {showWelcomeModal && <WelcomeModal />}
    {showInstagramFirstCommentModal && <InstagramFirstCommentModal />}
    {showWelcomePaidModal && <WelcomePaidModal />}
    {showWelcomeB4BTrialModal && <WelcomeB4BTrialModal />}
    {showProfilesDisconnectedModal && <ProfilesDisconnectedModal />}
    {showInstagramDirectPostingModal && <InstagramDirectPostingModal />}
    {showStealProfileModal && <StealProfileModal />}
  </React.Fragment>
);

AppModals.propTypes = {
  showUpgradeModal: PropTypes.bool.isRequired,
  showWelcomeModal: PropTypes.bool.isRequired,
  showWelcomePaidModal: PropTypes.bool.isRequired,
  showProfilesDisconnectedModal: PropTypes.bool.isRequired,
  showStealProfileModal: PropTypes.bool.isRequired,
  showInstagramDirectPostingModal: PropTypes.bool.isRequired,
  showWelcomeB4BTrialModal: PropTypes.bool.isRequired,
  showInstagramFirstCommentModal: PropTypes.bool.isRequired,
};

export default AppModals;
