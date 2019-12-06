import React from 'react';
import PropTypes from 'prop-types';
import Lightbox from 'react-images';
import { LinkifiedText, MultipleImages } from '@bufferapp/components';
import Draft from '../Draft';
import Text from '@bufferapp/components/Text';

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

const MultipleImagesDraft = ({
  hasPermission,
  isConfirmingDelete,
  isDeleting,
  isMoving,
  isPastDue,
  isWorking,
  imageUrls,
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
  currentImage,
  draftDetails,
  text,
  retweetProfile,
  retweetComment,
  retweetCommentLinks,
  scheduledAt,
  view,
  basic,
  hasFirstCommentFlip,
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
    >
      {children}
    </Draft>
  );
};

MultipleImagesDraft.propTypes = {
  ...Draft.commonPropTypes,
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
};

MultipleImagesDraft.defaultProps = Draft.defaultProps;

export default MultipleImagesDraft;
