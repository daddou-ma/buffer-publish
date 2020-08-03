import React from 'react';
import PropTypes from 'prop-types';
import {
  QueueItems,
  BufferLoading,
  BusinessTrialOrUpgradeCard,
  ComposerInput,
} from '@bufferapp/publish-shared-components';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import { WithFeatureLoader } from '@bufferapp/product-features';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import ProfilesDisconnectedBanner from '@bufferapp/publish-profiles-disconnected-banner';

import Empty from '../Empty';

const ErrorBoundary = getErrorBoundary(true);

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const topBarContainerStyle = {
  display: 'flex',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const containerStyle = {
  marginRight: '0.5rem',
};

const DraftList = ({
  features,
  loading,
  postLists,
  manager,
  onApproveClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  onComposerPlaceholderClick,
  onComposerCreateSuccess,
  showComposer,
  editMode,
  tabId,
  isLockedProfile,
  isDisconnectedProfile,
  canStartBusinessTrial,
  hasFirstCommentFlip,
  onComposerOverlayClick,
  preserveComposerStateOnClose,
}) => {
  if (features.isProUser()) {
    const startTrial = () =>
      window.location.assign(
        `${getURL.getStartTrialURL({
          trialType: 'small',
          cta: SEGMENT_NAMES.DRAFTS_SBP_TRIAL,
          nextUrl: 'https://publish.buffer.com',
        })}`
      );
    const goToBilling = () =>
      window.location.assign(
        `${getURL.getBillingURL({
          cta: SEGMENT_NAMES.DRAFTS_BUSINESS_UPGRADE,
        })}`
      );
    if (canStartBusinessTrial) {
      return (
        <BusinessTrialOrUpgradeCard
          heading="Collaborate With Your Team"
          body="Add your team to your Buffer account so you can collaborate and save even more time."
          cta="Start a Free 14-Day Trial of the Business Plan"
          onCtaClick={startTrial}
          backgroundImage="squares"
        />
      );
    }
    return (
      <BusinessTrialOrUpgradeCard
        heading="Collaborate With Your Team"
        body="Add your team to your Buffer account so you can collaborate and save even more time."
        cta="Upgrade to Buffer for Business"
        onCtaClick={goToBilling}
        backgroundImage="squares"
      />
    );
  }

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  return (
    <ErrorBoundary>
      {isDisconnectedProfile && <ProfilesDisconnectedBanner />}
      <div className={containerStyle}>
        <div style={topBarContainerStyle}>
          {tabId === 'drafts' && (
            <div style={composerStyle}>
              {showComposer && !editMode && (
                <ComposerPopover
                  type="drafts"
                  onSave={onComposerCreateSuccess}
                  preserveComposerStateOnClose={preserveComposerStateOnClose}
                  onComposerOverlayClick={onComposerOverlayClick}
                  editMode={editMode}
                />
              )}
              <ComposerInput
                placeholder="Create a new draft..."
                onPlaceholderClick={onComposerPlaceholderClick}
              />
            </div>
          )}
        </div>
        {showComposer && editMode && (
          <ComposerPopover
            type="drafts"
            onSave={onComposerCreateSuccess}
            onComposerOverlayClick={onComposerOverlayClick}
            editMode={editMode}
          />
        )}
        {postLists.length > 0 ? (
          <QueueItems
            items={postLists}
            onApproveClick={onApproveClick}
            onDeleteConfirmClick={onDeleteConfirmClick}
            onEditClick={onEditClick}
            onMoveToDraftsClick={onMoveToDraftsClick}
            onRequestApprovalClick={onRequestApprovalClick}
            onRescheduleClick={onRescheduleClick}
            draggable={false}
            type="drafts"
            hasFirstCommentFlip={hasFirstCommentFlip}
          />
        ) : (
          !isDisconnectedProfile && <Empty isManager={manager} view={tabId} />
        )}
      </div>
    </ErrorBoundary>
  );
};

DraftList.propTypes = {
  features: PropTypes.object.isRequired, // eslint-disable-line
  canStartBusinessTrial: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    })
  ),
  manager: PropTypes.bool.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onMoveToDraftsClick: PropTypes.func.isRequired,
  onRequestApprovalClick: PropTypes.func.isRequired,
  onRescheduleClick: PropTypes.func.isRequired,
  onComposerPlaceholderClick: PropTypes.func.isRequired,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  tabId: PropTypes.oneOf(['awaitingApproval', 'pendingApproval', 'drafts']),
  isLockedProfile: PropTypes.bool,
  isDisconnectedProfile: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  onComposerOverlayClick: PropTypes.func.isRequired,
  preserveComposerStateOnClose: PropTypes.bool,
};

DraftList.defaultProps = {
  preserveComposerStateOnClose: true,
  loading: true,
  postLists: [],
  showComposer: false,
  editMode: false,
  tabId: null,
  isLockedProfile: false,
  isDisconnectedProfile: false,
  hasFirstCommentFlip: false,
};

export default WithFeatureLoader(DraftList);
