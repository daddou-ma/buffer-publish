import React from 'react';
import PropTypes from 'prop-types';

import UpgradeModal from '@bufferapp/publish-upgrade-modal';
import WelcomeModal from '@bufferapp/publish-welcome-modal';
import StealProfileModal from '@bufferapp/publish-steal-profile-modal';
import ProfilesDisconnectedModal from '@bufferapp/publish-profiles-disconnected-modal';
import WelcomePaidModal from '@bufferapp/publish-welcome-paid-modal';
import InstagramFirstCommentModal from '@bufferapp/publish-ig-first-comment-modal';
import InstagramDirectPostingModal from '@bufferapp/publish-ig-direct-posting-modal';
import WelcomeB4BTrialModal from '@bufferapp/publish-welcome-b4b-trial-modal';
import B4bTrialCompleteModal from '@bufferapp/publish-b4b-trial-complete-modal';
import InstagramNewFirstCommentUserModal from '@bufferapp/publish-ig-new-first-comment-user-modal';
import InstagramNewFirstCommentStartTrialModal from '@bufferapp/publish-ig-first-comment-start-trial-modal';

const AppModals = ({
  showUpgradeModal,
  showWelcomeModal,
  showWelcomePaidModal,
  showProfilesDisconnectedModal,
  showStealProfileModal,
  showInstagramDirectPostingModal,
  showWelcomeB4BTrialModal,
  showInstagramFirstCommentModal,
  showInstagramNewFirstCommentUserModal,
  showB4BTrialExpiredModal,
  showInstagramFirstCommentStartTrialModal,
}) => (
  <React.Fragment>
    {showUpgradeModal && <UpgradeModal />}
    {showWelcomeModal && <WelcomeModal />}
    {showInstagramFirstCommentModal && <InstagramFirstCommentModal />}
    {showInstagramNewFirstCommentUserModal && <InstagramNewFirstCommentUserModal />}
    {showWelcomePaidModal && <WelcomePaidModal />}
    {showWelcomeB4BTrialModal && <WelcomeB4BTrialModal />}
    {showProfilesDisconnectedModal && <ProfilesDisconnectedModal />}
    {showInstagramDirectPostingModal && <InstagramDirectPostingModal />}
    {showStealProfileModal && <StealProfileModal />}
    {showB4BTrialExpiredModal && <B4bTrialCompleteModal />}
    {showInstagramFirstCommentStartTrialModal && <InstagramNewFirstCommentStartTrialModal />}
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
  showInstagramNewFirstCommentUserModal: PropTypes.bool.isRequired,
  showB4BTrialExpiredModal: PropTypes.bool.isRequired,
  showInstagramFirstCommentStartTrialModal: PropTypes.bool.isRequired,
};

export default AppModals;
