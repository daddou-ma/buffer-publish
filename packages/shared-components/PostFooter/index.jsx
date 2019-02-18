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

/* eslint-disable react/prop-types */
const renderPostAction = (postAction, serviceLink, isSent) => (
  isSent ?
    <Link href={serviceLink} unstyled newTab>
      <Text size={'small'} color={'shuttleGray'}>
        {postAction}
      </Text>
    </Link> :
  postAction
);

const renderText = (
  { postDetails, serviceLink },
  hasError,
  isSent,
  isPastReminder,
  day,
  dueTime,
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
        { !hasError ? renderPostAction(postDetails.postAction, serviceLink, isSent) : '' }
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
}) => {
  const hasError = postDetails.error && postDetails.error.length > 0;
  const isCustomScheduled = postDetails.isCustomScheduled;
  const isInstagramReminder = postDetails.isInstagramReminder;
  return (
    <div style={isSent ? sentPostDetailsStyle : getPostDetailsStyle(dragging)}>
      <div style={postActionDetailsStyle}>
        {renderIcon(hasError, isSent, isCustomScheduled, isInstagramReminder, isPastReminder)}
        {renderText({ postDetails, serviceLink }, hasError, isSent, isPastReminder, day, dueTime)}
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
};

PostFooter.defaultProps = {
  isDeleting: false,
  isConfirmingDelete: false,
  isWorking: false,
  dragging: false,
  isManager: true,
  isSent: false,
  isPastReminder: false,
};

export default PostFooter;
