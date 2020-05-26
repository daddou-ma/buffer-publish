import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ClockIcon, CircleInstReminderIcon } from '@bufferapp/components';
import { grayDark } from '@bufferapp/ui/style/colors';
import CardFooter from '../CardFooter';

const renderIcon = (
  hasError,
  isSent,
  isCustomScheduled,
  isInstagramReminder,
  isPastReminder
) => {
  if (
    (!hasError && !isCustomScheduled && !isInstagramReminder) ||
    isPastReminder
  )
    return;

  return (
    <Fragment>
      {isInstagramReminder && !hasError ? (
        <CircleInstReminderIcon color="instagram" />
      ) : null}
      {isCustomScheduled && !hasError && !isInstagramReminder ? (
        <ClockIcon color={isSent ? 'shuttleGray' : 'outerSpace'} />
      ) : null}
    </Fragment>
  );
};

const PostFooter = ({
  isDeleting,
  isConfirmingDelete,
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
  hasUserTags,
  shouldShowEditButton,
}) => {
  const hasError = postDetails.error && postDetails.error.length > 0;
  const { isCustomScheduled, isInstagramReminder } = postDetails;
  const comment = { commentEnabled, commentText };
  const hideButtons = !isManager || isSent || isPastReminder;
  const deletingMessage = (isDeleting || isConfirmingDelete) && 'Deleting...';
  const submittingMessage = isWorking && 'Sharing...';
  const actionMessage = deletingMessage || submittingMessage || '';

  return (
    <CardFooter
      hideButtons={hideButtons}
      icon={renderIcon(
        hasError,
        isSent,
        isCustomScheduled,
        isInstagramReminder,
        isPastReminder
      )}
      preMessage={isPastReminder ? dueTime : ''}
      message={isPastReminder ? day : hasError ? '' : postDetails.postAction}
      messageColor={isSent ? grayDark : ''}
      messageLink={serviceLink}
      onDeleteClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onSubmitClick={onShareNowClick}
      submitLabel={hasError ? 'Retry Now' : 'Share Now'}
      onRequeueClick={hasError ? onRequeueClick : null}
      requeueLabel={hasError ? 'Re-add to Queue' : null}
      hasFirstComment={hasCommentEnabled && comment.commentEnabled}
      isPerformingAction={!!actionMessage}
      actionMessage={actionMessage}
      isDragging={dragging}
      disableBorder={isSent}
      hasUserTags={hasUserTags}
      shouldShowEditButton={shouldShowEditButton}
    />
  );
};

PostFooter.propTypes = {
  isDeleting: PropTypes.bool,
  isConfirmingDelete: PropTypes.bool,
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
  hasUserTags: PropTypes.bool,
  shouldShowEditButton: PropTypes.bool,
};

PostFooter.defaultProps = {
  isDeleting: false,
  isWorking: false,
  dragging: false,
  isManager: true,
  isSent: false,
  isPastReminder: false,
  hasCommentEnabled: false,
  shouldShowEditButton: true,
};

export default PostFooter;
