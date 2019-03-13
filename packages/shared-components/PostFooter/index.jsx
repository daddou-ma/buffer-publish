import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  ClockIcon,
  CircleInstReminderIcon,
  Link,
} from '@bufferapp/components';
import {
  borderWidth,
} from '@bufferapp/components/style/border';
import {
  mystic,
  offWhite,
} from '@bufferapp/components/style/color';

import PostFooterButtons from '../PostFooterButtons';

const getPostDetailsStyle = dragging => ({
  display: 'flex',
  padding: '0.5rem 1rem',
  backgroundColor: offWhite,
  borderTop: `${borderWidth} solid ${mystic}`,
  opacity: dragging ? 0 : 1,
});

const sentPostDetailsStyle = {
  display: 'flex',
  padding: '0.5rem 1rem',
};

const postActionDetailsStyle = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
};

const postActionDetailsIconStyle = {
  marginRight: '0.5rem',
  display: 'flex',
  alignItems: 'center',
};

const postControlsStyle = {
  display: 'flex',
};

const igCommentWrapper = {
  display: 'flex',
  alignItems: 'center',
};

const igCommentIconWrapper = {
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '0.5rem',
  marginLeft: '0.5rem',
  borderLeft: '1px solid #cfd4d6',
};

const renderCommentIcon = () => (
  <span style={igCommentIconWrapper}>
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="#59626a"
        d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H6c-.746 0-2.886 1.672-4.13 2.52-.457.31-.87.032-.87-.52V3z"
      />
    </svg>
  </span>
);

const renderActionText = (postAction, hasCommentEnabled, comment, hasFirstCommentFlip) => (
  hasFirstCommentFlip && hasCommentEnabled && comment.commentEnabled ?
    <span style={igCommentWrapper}>
      {postAction}
      {renderCommentIcon()}
    </span>
    : postAction
);

/* eslint-disable react/prop-types */
const renderPostAction = (postAction, serviceLink, isSent, hasCommentEnabled, comment, hasFirstCommentFlip) => (
  isSent ?
    <Link href={serviceLink} unstyled newTab>
      <Text size={'small'} color={'shuttleGray'}>
        {renderActionText(postAction, hasCommentEnabled, comment, hasFirstCommentFlip)}
      </Text>
    </Link> :
    renderActionText(postAction, hasCommentEnabled, comment, hasFirstCommentFlip)
);

const renderText = (
  { postDetails, serviceLink },
  hasError,
  isSent,
  isPastReminder,
  day,
  dueTime,
  hasCommentEnabled,
  comment,
  hasFirstCommentFlip,
) => (
  isPastReminder ?
    (<span>
      <Text size={'small'}>
        <Text weight={'bold'} size={'small'}>{dueTime}</Text> {day}
      </Text>
    </span>)
    :
    (<span>
      <Text
        size={'small'}
        color={isSent ? 'shuttleGray' : 'black'}
      >
        { !hasError ? renderPostAction(postDetails.postAction, serviceLink, isSent, hasCommentEnabled, comment, hasFirstCommentFlip) : '' }
      </Text>
    </span>)
);

const renderIcon = (hasError, isSent, isCustomScheduled, isInstagramReminder, isPastReminder) => {
  if ((!hasError && !isCustomScheduled && !isInstagramReminder) || isPastReminder) return;

  return (<div style={postActionDetailsIconStyle}>
    {isInstagramReminder && !hasError ? <CircleInstReminderIcon color={'instagram'} /> : null}
    {isCustomScheduled && !hasError && !isInstagramReminder ? <ClockIcon color={isSent ? 'shuttleGray' : 'outerSpace'} /> : null}
  </div>);
};

/* eslint-enable react/prop-types */

const PostFooter = ({
  isDeleting,
  isConfirmingDelete,
  isWorking,
  onCancelConfirmClick,
  onDeleteClick,
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
  sharedBy,
  commentEnabled,
  commentText,
  hasCommentEnabled,
  hasFirstCommentFlip,
}) => {
  const hasError = postDetails.error && postDetails.error.length > 0;
  const isCustomScheduled = postDetails.isCustomScheduled;
  const isInstagramReminder = postDetails.isInstagramReminder;
  const comment = { commentEnabled, commentText };

  return (
    <div style={isSent ? sentPostDetailsStyle : getPostDetailsStyle(dragging)}>
      <div style={postActionDetailsStyle}>
        {renderIcon(hasError, isSent, isCustomScheduled, isInstagramReminder, isPastReminder)}
        {renderText(
          { postDetails, serviceLink },
          hasError,
          isSent,
          isPastReminder,
          day,
          dueTime,
          hasCommentEnabled,
          comment,
          hasFirstCommentFlip,
        )}
      </div>
      {!isSent && !isPastReminder && isManager && (
        <div style={postControlsStyle}>
          <PostFooterButtons
            error={postDetails.error}
            isDeleting={isDeleting}
            isConfirmingDelete={isConfirmingDelete}
            isWorking={isWorking}
            onCancelConfirmClick={onCancelConfirmClick}
            onDeleteClick={onDeleteClick}
            onEditClick={onEditClick}
            onDeleteConfirmClick={onDeleteConfirmClick}
            onShareNowClick={onShareNowClick}
            onRequeueClick={onRequeueClick}
          />
        </div>)
      }
    </div>
  );
};

PostFooter.propTypes = {
  isDeleting: PropTypes.bool,
  isConfirmingDelete: PropTypes.bool,
  isWorking: PropTypes.bool,
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  postDetails: PropTypes.shape({
    error: PropTypes.string,
    postAction: PropTypes.string,
  }).isRequired,
  dragging: PropTypes.bool,
  onRequeueClick: PropTypes.func,
  serviceLink: PropTypes.string,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
  day: PropTypes.string,
  dueTime: PropTypes.string,
  sharedBy: PropTypes.string,
  hasCommentEnabled: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  commentEnabled: PropTypes.bool,
  commentText: PropTypes.string,
};

PostFooter.defaultProps = {
  isDeleting: false,
  isConfirmingDelete: false,
  isWorking: false,
  dragging: false,
  isManager: true,
  isSent: false,
  isPastReminder: false,
  hasCommentEnabled: false,
  hasFirstCommentFlip: false,
};

export default PostFooter;
