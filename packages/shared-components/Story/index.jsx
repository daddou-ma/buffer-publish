import React from 'react';
import PropTypes from 'prop-types';
import { CircleInstReminderIcon } from '@bufferapp/components';

import Card from '../Card';
import CardHeader from '../CardHeader';
import CardFooter from '../CardFooter';
import Carousel from '../Carousel';

const Story = ({
  storyDetails,
  isDeleting,
  isWorking,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onPreviewClick,
}) => {
  const deletingMessage = isDeleting && 'Deleting...';
  const submittingMessage = isWorking && 'Sharing...';
  const actionMessage = deletingMessage || submittingMessage || '';

  return (
    <Card>
      <CardHeader
        creatorName={storyDetails.creatorName}
        avatarUrl={storyDetails.avatarUrl}
        createdAt={storyDetails.createdAt}
        onPreviewClick={onPreviewClick}
      />
      <Carousel cards={storyDetails.stories} editMode={false} />
      <CardFooter
        icon={<CircleInstReminderIcon color="instagram" />}
        message={storyDetails.storyAction}
        onDeleteClick={onDeleteConfirmClick}
        onEditClick={onEditClick}
        onSubmitClick={onShareNowClick}
        submitLabel="Share Now"
        isPerformingAction={!!actionMessage}
        actionMessage={actionMessage}
      />
    </Card>
  );
};

Story.propTypes = {
  storyDetails: PropTypes.shape({
    creatorName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    storyAction: PropTypes.string.isRequired,
    stories: PropTypes.arrayOf(PropTypes.shape({
      order: PropTypes.string,
      note: PropTypes.string,
      asset_url: PropTypes.string,
      thumbnail_url: PropTypes.string,
    })),
  }),
  isDeleting: PropTypes.bool,
  isWorking: PropTypes.bool,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onPreviewClick: PropTypes.func,
};

Story.defaultProps = {
  isDeleting: false,
  isWorking: false,
  onDeleteConfirmClick: null,
  onEditClick: null,
  onShareNowClick: null,
  onPreviewClick: null,
};

export default Story;
