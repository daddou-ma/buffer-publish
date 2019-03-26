import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import {
  IdTag,
  Image,
  LinkifiedText,
  Text,
} from '@bufferapp/components';
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
  onCancelConfirmClick,
  onDeleteClick,
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
}) => {
  const children = (
    <div style={postContentStyle}>
      <span style={postContentTextStyle}>
        {basic ?
          <Text
            color="black"
            size="mini"
          >
            {text}
          </Text> :
          <LinkifiedText
            color="black"
            links={links}
            size="mini"
            newTab
            unstyled
          >
            {text}
          </LinkifiedText>
        }
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
      onCancelConfirmClick={onCancelConfirmClick}
      onDeleteClick={onDeleteClick}
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
    }),
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
