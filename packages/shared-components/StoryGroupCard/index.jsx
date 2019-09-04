import React from 'react';
import PropTypes from 'prop-types';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const StoryGroupCard = ({
  postDetails,
  isConfirmingDelete,
  isDeleting,
  isWorking,
  links,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  retweetProfile,
  text,
  draggable,
  dragging,
  hovering,
  isOver,
  statistics,
  subprofiles,
  profile_service: profileService,
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  serviceLink,
  isSent,
  isManager,
  isBusinessAccount,
  isPastReminder,
  day,
  dueTime,
  sharedBy,
  basic,
  commentEnabled,
  commentText,
  hasCommentEnabled,
  hasFirstCommentFlip,
}) => {
  const children = (
    <div style={postContentStyle}>
      Carousel component
    </div>
  );

  return (
    <Post
      postDetails={postDetails}
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isWorking={isWorking}
      links={links}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
      onRequeueClick={onRequeueClick}
      retweetProfile={retweetProfile}
      text={text}
      draggable={draggable}
      dragging={dragging}
      hovering={hovering}
      isOver={isOver}
      statistics={statistics}
      subprofiles={subprofiles}
      profileService={profileService}
      locationName={locationName}
      sourceUrl={sourceUrl}
      subprofileID={subprofileID}
      serviceLink={serviceLink}
      isSent={isSent}
      isManager={isManager}
      isBusinessAccount={isBusinessAccount}
      isPastReminder={isPastReminder}
      day={day}
      dueTime={dueTime}
      sharedBy={sharedBy}
      basic={basic}
      commentEnabled={commentEnabled}
      commentText={commentText}
      hasCommentEnabled={hasCommentEnabled}
      hasFirstCommentFlip={hasFirstCommentFlip}
    >
      {children}
    </Post>
  );
};

StoryGroupCard.propTypes = {
  ...Post.commonPropTypes,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
};

StoryGroupCard.defaultProps = Post.defaultProps;

export default StoryGroupCard;
