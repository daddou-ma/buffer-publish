import React from 'react';
import PropTypes from 'prop-types';
import Card from '../Card';
import CardHeader from '../CardHeader';
import DraftFooter from '../DraftFooter';
import RenderPostMetaBar from '../Post/RenderPostMetaBar';
import UpdateContent from '../UpdateContent';

const postContentStyle = {
  padding: '1rem',
};

const Draft = ({
  hasPermission,
  isConfirmingDelete,
  isDeleting,
  isWorking,
  isMoving,
  isPastDue,
  manager,
  onApproveClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  draftDetails,
  scheduledAt,
  view,
  basic,
  hasFirstCommentFlip,
  profileService,
  geolocationName,
  postContent,
}) => (
  <Card>
    <CardHeader
      headerDetails={{
        creatorName: draftDetails.creatorName,
        avatarUrl: draftDetails.avatarUrl,
        createdAt: draftDetails.createdAt,
      }}
    />
    {/* Draft Content */}
    <div style={postContentStyle}>
      <UpdateContent {...postContent} basic={basic} />
    </div>
    <RenderPostMetaBar
      profileService={profileService}
      locationName={geolocationName}
    />
    <DraftFooter
      hasPermission={hasPermission}
      isDeleting={isDeleting}
      isConfirmingDelete={isConfirmingDelete}
      isMoving={isMoving}
      isPastDue={isPastDue}
      isWorking={isWorking}
      manager={manager}
      scheduledAt={scheduledAt}
      onApproveClick={onApproveClick}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onMoveToDraftsClick={onMoveToDraftsClick}
      onRequestApprovalClick={onRequestApprovalClick}
      onRescheduleClick={onRescheduleClick}
      draftDetails={draftDetails}
      view={view}
      hasFirstCommentFlip={hasFirstCommentFlip}
    />
  </Card>
);

Draft.propTypes = {
  hasPermission: PropTypes.bool.isRequired,
  isConfirmingDelete: PropTypes.bool,
  isDeleting: PropTypes.bool,
  isWorking: PropTypes.bool,
  isMoving: PropTypes.bool,
  isPastDue: PropTypes.bool,
  manager: PropTypes.bool,
  onDeleteConfirmClick: PropTypes.func,
  onApproveClick: PropTypes.func,
  onMoveToDraftsClick: PropTypes.func,
  onRequestApprovalClick: PropTypes.func,
  onRescheduleClick: PropTypes.func,
  onEditClick: PropTypes.func,
  draftDetails: PropTypes.shape({
    isRetweet: PropTypes.bool,
    postAction: PropTypes.string,
    error: PropTypes.string,
    creatorName: PropTypes.string,
    avatarUrl: PropTypes.string,
    createdAt: PropTypes.string,
  }).isRequired,
  hasFirstCommentFlip: PropTypes.bool,
  view: PropTypes.string.isRequired,
};

Draft.defaultProps = {
  isConfirmingDelete: false,
  isDeleting: false,
  isWorking: false,
  isMoving: false,
  isPastDue: false,
  manager: true,
  hasFirstCommentFlip: false,
};

export default Draft;
