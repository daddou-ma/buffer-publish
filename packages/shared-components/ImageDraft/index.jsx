import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { IdTag, Image, LinkifiedText, Text } from '@bufferapp/components';
import Draft from '../Draft';

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

const thumbnailWrapperStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '9rem',
  height: '9rem',
  borderRadius: '4px',
  border: '1px solid #B8B8B8',
  background: '#F5F5F5',
};

const imageTagStyle = {
  position: 'absolute',
  bottom: '0.7rem',
  left: '0.7rem',
};

const renderTag = tag => {
  if (!tag) return;
  return (
    <span style={imageTagStyle}>
      <IdTag>{tag}</IdTag>
    </span>
  );
};

const ImageDraft = ({
  hasPermission,
  isConfirmingDelete,
  isDeleting,
  isMoving,
  isPastDue,
  isWorking,
  imageSrc,
  links,
  manager,
  onApproveClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  isLightboxOpen,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  draftDetails,
  text,
  tag,
  retweetProfile,
  retweetComment,
  retweetCommentLinks,
  scheduledAt,
  view,
  basic,
  hasFirstCommentFlip,
  profile_service,
  service_geolocation_name,
}) => {
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        {basic ? (
          <Text color="black" size="mini">
            {text}
          </Text>
        ) : (
          <LinkifiedText
            color="black"
            links={links}
            size="mini"
            newTab
            unstyled
          >
            {text}
          </LinkifiedText>
        )}
      </span>
      <div style={imageWrapperStyle} onClick={onImageClick}>
        <div style={thumbnailWrapperStyle}>
          <Image
            src={imageSrc}
            width="auto"
            height="auto"
            maxWidth="9rem"
            maxHeight="9rem"
            minHeight="7rem"
            minWidth="7rem"
            objectFit="cover"
          />
        </div>
        <Lightbox
          images={[{ src: `${imageSrc}` }]}
          isOpen={isLightboxOpen}
          onClickPrev={onImageClickPrev}
          onClickNext={onImageClickNext}
          onClose={onImageClose}
          backdropClosesModal
          showImageCount={false}
        />
        {renderTag(tag)}
      </div>
    </div>
  );

  return (
    <Draft
      hasPermission={hasPermission}
      isConfirmingDelete={isConfirmingDelete}
      isDeleting={isDeleting}
      isMoving={isMoving}
      isPastDue={isPastDue}
      isWorking={isWorking}
      links={links}
      manager={manager}
      onApproveClick={onApproveClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onMoveToDraftsClick={onMoveToDraftsClick}
      onRequestApprovalClick={onRequestApprovalClick}
      onRescheduleClick={onRescheduleClick}
      draftDetails={draftDetails}
      text={text}
      retweetProfile={retweetProfile}
      retweetComment={retweetComment}
      retweetCommentLinks={retweetCommentLinks}
      scheduledAt={scheduledAt}
      view={view}
      basic={basic}
      hasFirstCommentFlip={hasFirstCommentFlip}
      profileService={profile_service}
      geolocationName={service_geolocation_name}
    >
      {children}
    </Draft>
  );
};

ImageDraft.propTypes = {
  ...Draft.commonPropTypes,
  imageSrc: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      rawString: PropTypes.string,
      displayString: PropTypes.string,
      expandedUrl: PropTypes.string,
      indices: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  text: PropTypes.string.isRequired,
  tag: PropTypes.string,
  isLightboxOpen: PropTypes.bool,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
};

ImageDraft.defaultProps = ImageDraft.defaultProps;

export default ImageDraft;
