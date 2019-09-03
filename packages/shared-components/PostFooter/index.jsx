import React from 'react';
import PropTypes from 'prop-types';
import {
  ClockIcon,
  CircleInstReminderIcon,
} from '@bufferapp/components';
import { grayDark } from '@bufferapp/ui/style/colors';
import CardFooter from '../CardFooter';

const renderIcon = (hasError, isSent, isCustomScheduled, isInstagramReminder, isPastReminder) => {
  if ((!hasError && !isCustomScheduled && !isInstagramReminder) || isPastReminder) return;

  return (
    <div>
      {isInstagramReminder && !hasError ? <CircleInstReminderIcon color="instagram" /> : null}
      {isCustomScheduled && !hasError && !isInstagramReminder ? <ClockIcon color={isSent ? 'shuttleGray' : 'outerSpace'} /> : null}
    </div>
  );
};

const PostFooter = ({
  isDeleting,
  isWorking,
  onDeleteConfirmClick,
  onRequeueClick,
  onEditClick,
  onShareNowClick,
  postDetails,
  dragging,
  serviceLink,
  isSent,
  isManager,
  isPastReminder,
  day,
  dueTime,
  commentEnabled,
  commentText,
  hasCommentEnabled,
}) => {
  const hasError = postDetails.error && postDetails.error.length > 0;
  const { isCustomScheduled, isInstagramReminder } = postDetails;
  const comment = { commentEnabled, commentText };
  const hideButtons = !isManager || isSent || isPastReminder;
  const deletingMessage = isDeleting && 'Deleting...';
  const submittingMessage = isWorking && 'Sharing...';
  const actionMessage = deletingMessage || submittingMessage || '';

  return (
    <CardFooter
      hideButtons={hideButtons}
      icon={renderIcon(hasError, isSent, isCustomScheduled, isInstagramReminder, isPastReminder)}
      preMessage={isPastReminder ? dueTime : '' }
      message={isPastReminder ? day : (hasError ? '' : postDetails.postAction)}
      messageColor={isSent ? grayDark : ''}
      hasError={hasError}
      messageLink={serviceLink}
      onDeleteClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onSubmitClick={onShareNowClick}
      submitLabel={hasError ? 'Retry Now' : 'Share Now'}
      onRequeueClick={hasError ? onRequeueClick : null}
      hasFirstComment={hasCommentEnabled && comment.commentEnabled}
      isPerformingAction={!!actionMessage}
      actionMessage={actionMessage}
      isDragging={dragging}
      disableBorder={isSent}
    />
  );
};

PostFooter.propTypes = {
  isDeleting: PropTypes.bool,
  isWorking: PropTypes.bool,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  postDetails: PropTypes.shape({
    error: PropTypes.string,
    postAction: PropTypes.string,
    isCustomScheduled: PropTypes.bool,
    isInstagramReminder: PropTypes.bool,
  }).isRequired,
  dragging: PropTypes.bool,
  onRequeueClick: PropTypes.func,
  serviceLink: PropTypes.string,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
  day: PropTypes.string,
  dueTime: PropTypes.string,
  hasCommentEnabled: PropTypes.bool,
  commentEnabled: PropTypes.bool,
  commentText: PropTypes.string,
};

PostFooter.defaultProps = {
  isDeleting: false,
  isWorking: false,
  dragging: false,
  isManager: true,
  isSent: false,
  isPastReminder: false,
  hasCommentEnabled: false,
};

export default PostFooter;
