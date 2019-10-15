import React from 'react';
import ImageDraft from '../ImageDraft';

const VideoDraft = ({
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
}) => (
  <ImageDraft
    hasPermission={hasPermission}
    isConfirmingDelete={isConfirmingDelete}
    isDeleting={isDeleting}
    isMoving={isMoving}
    isPastDue={isPastDue}
    isWorking={isWorking}
    imageSrc={imageSrc}
    links={links}
    manager={manager}
    onApproveClick={onApproveClick}
    onDeleteConfirmClick={onDeleteConfirmClick}
    onEditClick={onEditClick}
    onMoveToDraftsClick={onMoveToDraftsClick}
    onRequestApprovalClick={onRequestApprovalClick}
    onRescheduleClick={onRescheduleClick}
    isLightboxOpen={isLightboxOpen}
    onImageClick={onImageClick}
    onImageClickNext={onImageClickNext}
    onImageClickPrev={onImageClickPrev}
    onImageClose={onImageClose}
    draftDetails={draftDetails}
    text={text}
    tag={tag}
    retweetProfile={retweetProfile}
    retweetComment={retweetComment}
    retweetCommentLinks={retweetCommentLinks}
    scheduledAt={scheduledAt}
    view={view}
    basic={basic}
    hasFirstCommentFlip={hasFirstCommentFlip}
  />
);

VideoDraft.propTypes = ImageDraft.propTypes;

VideoDraft.defaultProps = {
  ...ImageDraft.defaultProps,
  tag: 'VIDEO',
};

export default VideoDraft;
