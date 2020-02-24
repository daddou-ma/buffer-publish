import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { LinkifiedText, MultipleImages, Text } from '@bufferapp/components';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const imagesWrapperStyle = {
  cursor: 'pointer',
};

const MultipleImagesPost = ({
  postDetails,
  imageUrls,
  isConfirmingDelete,
  isDeleting,
  isWorking,
  links,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  retweetProfile,
  text,
  isLightboxOpen,
  onImageClickPrev,
  onImageClickNext,
  onImageClose,
  onImageClick,
  currentImage,
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
  hasPushNotifications,
  onSetRemindersClick,
  campaignName,
  campaignColor,
}) => {
  const images = imageUrls.map(url => ({ src: `${url}` }));
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        {basic ? (
          <Text color="black" size="mini" whitespace="pre-wrap">
            {text}
          </Text>
        ) : (
          <LinkifiedText
            color="black"
            links={links}
            size="mini"
            whitespace="pre-wrap"
            newTab
            unstyled
          >
            {text}
          </LinkifiedText>
        )}
      </span>
      <div style={imagesWrapperStyle} onClick={onImageClick}>
        <MultipleImages
          border="rounded"
          height="9rem"
          urls={imageUrls}
          width="9rem"
        />
        <Lightbox
          images={images}
          isOpen={isLightboxOpen}
          onClickPrev={onImageClickPrev}
          onClickNext={onImageClickNext}
          onClose={onImageClose}
          currentImage={currentImage}
          backdropClosesModal
          showImageCount={false}
        />
      </div>
    </div>
  );

  return (
    <Post
      postDetails={postDetails}
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isWorking={isWorking}
      links={links}
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
      hasPushNotifications={hasPushNotifications}
      onSetRemindersClick={onSetRemindersClick}
      campaignName={campaignName}
      campaignColor={campaignColor}
    >
      {children}
    </Post>
  );
};

MultipleImagesPost.propTypes = {
  ...Post.commonPropTypes,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
      rawString: PropTypes.string,
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
  isLightboxOpen: PropTypes.bool,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onImageClick: PropTypes.func,
  currentImage: PropTypes.number,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
};

MultipleImagesPost.defaultProps = Post.defaultProps;

export default MultipleImagesPost;
