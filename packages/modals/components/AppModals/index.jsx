import React from 'react';
import PropTypes from 'prop-types';

import SwitchPlanModal from '@bufferapp/publish-switch-plan-modal';
import WelcomeModal from '@bufferapp/publish-welcome-modal';
import StealProfileModal from '@bufferapp/publish-steal-profile-modal';
import ProfilesDisconnectedModal from '@bufferapp/publish-profiles-disconnected-modal';
import WelcomePaidModal from '@bufferapp/publish-welcome-paid-modal';
import InstagramFirstCommentModal from '@bufferapp/publish-ig-first-comment-modal';
import InstagramDirectPostingModal from '@bufferapp/publish-ig-direct-posting-modal';
import WelcomeB4BTrialModal from '@bufferapp/publish-welcome-b4b-trial-modal';
import B4bTrialCompleteModal from '@bufferapp/publish-b4b-trial-complete-modal';
import InstagramFirstCommentProTrialModal from '@bufferapp/publish-ig-first-comment-pro-trial-modal';
import CloseComposerConfirmationModal from '@bufferapp/publish-close-composer-confirmation-modal';

const AppModals = ({
  showUpgradeModal,
  showWelcomeModal,
  showWelcomePaidModal,
  showProfilesDisconnectedModal,
  showStealProfileModal,
  showInstagramDirectPostingModal,
  showWelcomeB4BTrialModal,
  showInstagramFirstCommentModal,
  showB4BTrialExpiredModal,
  showInstagramFirstCommentProTrialModal,
  showCloseComposerConfirmationModal,
}) => (
  <React.Fragment>
    {showProfilesDisconnectedModal && <ProfilesDisconnectedModal />}
    {showUpgradeModal && <SwitchPlanModal />}
    {showWelcomeModal && <WelcomeModal />}
    {showInstagramFirstCommentModal && <InstagramFirstCommentModal />}
    {showWelcomePaidModal && <WelcomePaidModal />}
    {showWelcomeB4BTrialModal && <WelcomeB4BTrialModal />}
    {showInstagramDirectPostingModal && <InstagramDirectPostingModal />}
    {showStealProfileModal && <StealProfileModal />}
    {showB4BTrialExpiredModal && <B4bTrialCompleteModal />}
    {showInstagramFirstCommentProTrialModal && <InstagramFirstCommentProTrialModal />}
    {showCloseComposerConfirmationModal && <CloseComposerConfirmationModal />}
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
  showB4BTrialExpiredModal: PropTypes.bool.isRequired,
  showInstagramFirstCommentProTrialModal: PropTypes.bool.isRequired,
  showCloseComposerConfirmationModal: PropTypes.bool.isRequired,
};

export default AppModals;
