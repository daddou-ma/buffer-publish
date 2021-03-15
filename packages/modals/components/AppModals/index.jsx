import React from 'react';
import PropTypes from 'prop-types';

import SwitchPlanModal from '@bufferapp/publish-switch-plan-modal';
import StealProfileModal from '@bufferapp/publish-steal-profile-modal';
import ProfilesDisconnectedModal from '@bufferapp/publish-profiles-disconnected-modal';
import InstagramFirstCommentModal from '@bufferapp/publish-ig-first-comment-modal';
import TrialCompleteModal from '@bufferapp/publish-trial-complete-modal';
import InstagramFirstCommentProTrialModal from '@bufferapp/publish-ig-first-comment-pro-trial-modal';
import CloseComposerConfirmationModal from '@bufferapp/publish-close-composer-confirmation-modal';
import DeleteCampaignModal from '@bufferapp/publish-delete-campaign-modal';

const AppModals = ({
  showSwitchPlanModal,
  showProfilesDisconnectedModal,
  showStealProfileModal,
  showInstagramFirstCommentModal,
  showTrialCompleteModal,
  showInstagramFirstCommentProTrialModal,
  showCloseComposerConfirmationModal,
  showDeleteCampaignModal,
}) => (
  <>
    {showProfilesDisconnectedModal && <ProfilesDisconnectedModal />}
    {showSwitchPlanModal && <SwitchPlanModal />}
    {showInstagramFirstCommentModal && <InstagramFirstCommentModal />}
    {showStealProfileModal && <StealProfileModal />}
    {showTrialCompleteModal && <TrialCompleteModal />}
    {showInstagramFirstCommentProTrialModal && (
      <InstagramFirstCommentProTrialModal />
    )}
    {showCloseComposerConfirmationModal && <CloseComposerConfirmationModal />}
    {showDeleteCampaignModal && <DeleteCampaignModal />}
  </>
);

AppModals.propTypes = {
  showSwitchPlanModal: PropTypes.bool.isRequired,
  showProfilesDisconnectedModal: PropTypes.bool.isRequired,
  showStealProfileModal: PropTypes.bool.isRequired,
  showInstagramFirstCommentModal: PropTypes.bool.isRequired,
  showTrialCompleteModal: PropTypes.bool.isRequired,
  showInstagramFirstCommentProTrialModal: PropTypes.bool.isRequired,
  showCloseComposerConfirmationModal: PropTypes.bool.isRequired,
  showDeleteCampaignModal: PropTypes.bool.isRequired,
};

export default AppModals;
