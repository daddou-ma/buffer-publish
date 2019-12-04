import React from 'react';
import PropTypes from 'prop-types';
import { ClockIcon, WarningIcon } from '@bufferapp/components';
import { red } from '@bufferapp/ui/style/colors';

import CardFooter from '../CardFooter';

/* eslint-disable react/prop-types */
const renderIcon = ({ isPastDue, scheduledAt }) => {
  if (isPastDue) {
    return <WarningIcon color={red} />;
  }
  if (scheduledAt) {
    return <ClockIcon />;
  }
  return null;
};
/* eslint-enable react/prop-types */

const renderDraftsAction = ({
  hasRescheduleAction,
  hasRequestApprovalAction,
  manager,
  onApproveClick,
  onRequestApprovalClick,
  onRescheduleClick,
}) => {
  if (hasRescheduleAction) {
    return onRescheduleClick;
  }
  if (manager) {
    return onApproveClick;
  }
  if (hasRequestApprovalAction) {
    return onRequestApprovalClick;
  }
  return null;
};

const renderDraftsActionLabel = ({
  hasRescheduleAction,
  hasRequestApprovalAction,
  manager,
  draftsView,
}) => {
  if (hasRescheduleAction) return 'Reschedule';
  if (manager) {
    if (draftsView) {
      return 'Add to Queue';
    }
    return 'Approve';
  }
  if (hasRequestApprovalAction) return 'Request Approval';
};

const DraftFooter = ({
  hasPermission,
  isDeleting,
  isConfirmingDelete,
  isMoving,
  isWorking,
  isPastDue,
  manager,
  onApproveClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  scheduledAt,
  draftDetails,
  view,
  hasFirstCommentFlip,
}) => {
  const { commentEnabled, hasCommentEnabled, postAction } = draftDetails;
  const approvalView = view === 'approval';
  const draftsView = view === 'drafts';

  // Drafts Actions
  const hasRescheduleAction = isPastDue && hasPermission;
  const hasRequestApprovalAction = draftsView && hasPermission;

  // Performing Actions
  const deletingMessage = (isDeleting || isConfirmingDelete) && 'Deleting...';
  const movingMessage = isMoving && approvalView && 'Moving...';
  const requestingMessage = isMoving && !approvalView && 'Requesting...';
  const approvingMessage =
    isWorking && manager && approvalView && 'Approving...';
  const addingMessage = isWorking && manager && !approvalView && 'Adding...';
  const actionMessage =
    deletingMessage ||
    movingMessage ||
    requestingMessage ||
    approvingMessage ||
    addingMessage ||
    '';

  return (
    <CardFooter
      hideButtons={!manager && !hasPermission}
      icon={renderIcon({ isPastDue, scheduledAt })}
      message={postAction}
      messageColor={isPastDue ? red : ''}
      onDeleteClick={hasPermission ? onDeleteConfirmClick : null}
      onEditClick={
        !hasPermission || (!manager && approvalView) ? null : onEditClick
      }
      onMoveToDraftsClick={
        approvalView && hasPermission ? onMoveToDraftsClick : null
      }
      onSubmitDraftsClick={renderDraftsAction({
        hasRescheduleAction,
        hasRequestApprovalAction,
        manager,
        onApproveClick,
        onRequestApprovalClick,
        onRescheduleClick,
      })}
      submitDraftsLabel={renderDraftsActionLabel({
        hasRescheduleAction,
        hasRequestApprovalAction,
        manager,
        draftsView,
      })}
      hasFirstComment={
        hasFirstCommentFlip && hasCommentEnabled && commentEnabled
      }
      isPerformingAction={!!actionMessage}
      actionMessage={actionMessage}
    />
  );
};

DraftFooter.propTypes = {
  hasPermission: PropTypes.bool.isRequired,
  isDeleting: PropTypes.bool,
  isConfirmingDelete: PropTypes.bool,
  isMoving: PropTypes.bool,
  isWorking: PropTypes.bool,
  isPastDue: PropTypes.bool,
  manager: PropTypes.bool.isRequired,
  onApproveClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onMoveToDraftsClick: PropTypes.func,
  onRequestApprovalClick: PropTypes.func,
  onRescheduleClick: PropTypes.func,
  scheduledAt: PropTypes.number,
  draftDetails: PropTypes.shape({
    creatorName: PropTypes.string,
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    createdAt: PropTypes.string,
    via: PropTypes.string,
    postAction: PropTypes.string,
    commentEnabled: PropTypes.bool,
    hasCommentEnabled: PropTypes.bool,
  }).isRequired,
  view: PropTypes.string.isRequired,
  hasFirstCommentFlip: PropTypes.bool,
};

DraftFooter.defaultProps = {
  isDeleting: false,
  isMoving: false,
  isWorking: false,
  isPastDue: false,
  onApproveClick: null,
  onDeleteConfirmClick: null,
  onEditClick: null,
  onMoveToDraftsClick: null,
  onRequestApprovalClick: null,
  onRescheduleClick: null,
};

export default DraftFooter;
