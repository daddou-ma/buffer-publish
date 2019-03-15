import React from 'react';
import PropTypes from 'prop-types';
import {
  QueueItems,
  BufferLoading,
  LockedProfileNotification,
  BusinessTrialOrUpgradeCard,
} from '@bufferapp/publish-shared-components';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { trackAction } from '@bufferapp/publish-data-tracking';
import { Input } from '@bufferapp/components';

import Empty from '../Empty';

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
  onCancelConfirmClick,
  onDeleteClick,
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
  profileLimit,
  isOwner,
  onClickUpgrade,
  canStartBusinessTrial,
}) => {
  if (features.isProUser()) {
    const startTrial = () => window.location.assign('https://buffer.com/billing/start-trial?trialType=small&next=https://publish.buffer.com');
    const goToBilling = () => window.location.assign('https://buffer.com/app/account/receipts?content_only=true');
    const trackAndGo = ({ location, action, afterTracked }) => {
      trackAction({
        location,
        action,
      }, {
        success: afterTracked,
        error: afterTracked,
      });
    };
    if (canStartBusinessTrial) {
      return (<BusinessTrialOrUpgradeCard
        heading="Collaborate With Your Team"
        body="Add your team to your Buffer account so you can collaborate and save even more time."
        cta="Start a Free 14-Day Trial of the Business Plan"
        onCtaClick={() => { trackAndGo({ location: 'drafts', action: 'collaborate_with_team_b4b_trial_start_click', afterTracked: startTrial }); }}
        backgroundImage="squares"
      />);
    }
    return (<BusinessTrialOrUpgradeCard
      heading="Collaborate With Your Team"
      body="Add your team to your Buffer account so you can collaborate and save even more time."
      cta="Upgrade to Buffer for Business"
      onCtaClick={() => { trackAndGo({ location: 'analytics', action: 'collaborate_with_team_b4b_upgrade_click', afterTracked: goToBilling }); }}
      backgroundImage="squares"
    />);
  }

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  if (isLockedProfile) {
    if (!isOwner) {
      return (
        <LockedProfileNotification
          type={'teamMember'}
        />
      );
    } else if (features.isFreeUser()) {
      return (
        <LockedProfileNotification
          onClickUpgrade={onClickUpgrade}
          profileLimit={profileLimit}
          type={'free'}
        />
      );
    } else if (features.isProUser()) {
      return (
        <LockedProfileNotification
          onClickUpgrade={onClickUpgrade}
          profileLimit={profileLimit}
          type={'pro'}
        />
      );
    }
    return (
      <LockedProfileNotification
        onClickUpgrade={onClickUpgrade}
        profileLimit={profileLimit}
        type={'business'}
      />
    );
  }

  return (
    <div className={containerStyle}>
      <div style={topBarContainerStyle}>
        {tabId === 'drafts' &&
          <div style={composerStyle}>
            {showComposer && !editMode &&
              <ComposerPopover
                type={'drafts'}
                onSave={onComposerCreateSuccess}
                preserveComposerStateOnClose
              />
            }
            <Input
              placeholder={'Create a new draft...'}
              onFocus={onComposerPlaceholderClick}
            />
          </div>
        }
      </div>
      {showComposer && editMode &&
        <ComposerPopover
          type={'drafts'}
          onSave={onComposerCreateSuccess}
        />
      }
      {
        postLists.length > 0 ?
          <QueueItems
            items={postLists}
            onApproveClick={onApproveClick}
            onCancelConfirmClick={onCancelConfirmClick}
            onDeleteClick={onDeleteClick}
            onDeleteConfirmClick={onDeleteConfirmClick}
            onEditClick={onEditClick}
            onMoveToDraftsClick={onMoveToDraftsClick}
            onRequestApprovalClick={onRequestApprovalClick}
            onRescheduleClick={onRescheduleClick}
            draggable={false}
            type={'drafts'}
          /> :
          <Empty
            isManager={manager}
            view={tabId}
          />
      }
    </div>
  );
};

DraftList.propTypes = {
  features: PropTypes.object.isRequired, // eslint-disable-line
  canStartBusinessTrial: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  manager: PropTypes.bool.isRequired,
  onApproveClick: PropTypes.func.isRequired,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
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
  profileLimit: PropTypes.number.isRequired,
  isOwner: PropTypes.bool,
  onClickUpgrade: PropTypes.func.isRequired,
};

DraftList.defaultProps = {
  loading: true,
  postLists: [],
  showComposer: false,
  editMode: false,
  tabId: null,
  isLockedProfile: false,
  isOwner: true,
};

export default WithFeatureLoader(DraftList);
