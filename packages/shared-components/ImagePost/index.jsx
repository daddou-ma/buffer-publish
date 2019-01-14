import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import {
  IdTag,
  Image,
  LinkifiedText,
} from '@bufferapp/components';
import Post from '../Post';

const postContentStyle = {
  display: 'flex',
};

const postContentTextStyle = {
  paddingRight: '1rem',
  flexGrow: 1,
};

const imageWrapperStyle = {
  position: 'relative',
  cursor: 'pointer',
};

const imageTagStyle = {
  position: 'absolute',
  bottom: '0.7rem',
  left: '0.7rem',
};

const renderTag = (tag) => {
  if (!tag) return;
  return (
    <span style={imageTagStyle}>
      <IdTag>{tag}</IdTag>
    </span>
  );
};

const ImagePost = ({
  isConfirmingDelete,
  isDeleting,
  isWorking,
  imageSrc,
  links,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  postDetails,
  text,
  tag,
  retweetProfile,
  isLightboxOpen,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  draggable,
  dragging,
  hovering,
  statistics,
  profile_service: profileService,
  service_geolocation_name: locationName,
  source_url: sourceUrl,
  subprofile_id: subprofileID,
  subprofiles,
  serviceLink,
  isSent,
  isManager,
}) => {
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        <LinkifiedText
          color={'black'}
          links={links}
          size={'mini'}
          whitespace={'pre-wrap'}
          newTab
          unstyled
        >
          {text}
        </LinkifiedText>
      </span>
      <div style={imageWrapperStyle} onClick={onImageClick}>
        <Image
          src={imageSrc}
          width={'12rem'}
          maxHeight={'7rem'}
          minHeight={'5rem'}
          border={'rounded'}
          objectFit={'cover'}
        />
        <Lightbox
          images={[{ src: `${imageSrc}` }]}
          isOpen={isLightboxOpen}
          onClickPrev={onImageClickPrev}
          onClickNext={onImageClickNext}
          onClose={onImageClose}
          backdropClosesModal
          showImageCount={false}
        />
        { renderTag(tag) }
      </div>

    </div>
  );

  return (
    <Post
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isWorking={isWorking}
      imageSrc={imageSrc}
      links={links}
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
      onRequeueClick={onRequeueClick}
      postDetails={postDetails}
      text={text}
      retweetProfile={retweetProfile}
      draggable={draggable}
      dragging={dragging}
      hovering={hovering}
      statistics={statistics}
      profileService={profileService}
      locationName={locationName}
      sourceUrl={sourceUrl}
      subprofileID={subprofileID}
      subprofiles={subprofiles}
      serviceLink={serviceLink}
      isSent={isSent}
      isManager={isManager}
    >
      {children}
    </Post>
  );
};

ImagePost.propTypes = {
  ...Post.commonPropTypes,
  imageSrc: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    }),
  ).isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  isLightboxOpen: PropTypes.bool,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
};

ImagePost.defaultProps = ImagePost.defaultProps;

export default ImagePost;
