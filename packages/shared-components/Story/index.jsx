import React from 'react';
import PropTypes from 'prop-types';
import { CircleInstReminderIcon } from '@bufferapp/components';
import { CoverImage, PlayIcon } from '@bufferapp/publish-story-group-composer/components/Carousel/CardItem/styles';
import Card from '../Card';
import CardHeader from '../CardHeader';
import CardFooter from '../CardFooter';
import Carousel, { CarouselCard, getCardSizes } from '../Carousel';

const Story = ({
  id,
  profileId,
  scheduledAt,
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
  const largeCards = false;
  const { cardWidth, cardHeight } = getCardSizes(largeCards);
  const {
    stories, creatorName, avatarUrl, createdAt, storyAction,
  } = storyDetails;

  return (
    <Card>
      <CardHeader
        creatorName={creatorName}
        avatarUrl={avatarUrl}
        createdAt={createdAt}
        onPreviewClick={() => onPreviewClick({
          stories, profileId, id, scheduledAt,
        })}
      />
      <Carousel
        editMode={false}
        totalCardsToShow={(stories && stories.length) || 0}
        totalStories={(stories && stories.length) || 0}
      >
        {stories && stories.map(card => (
          <CarouselCard
            cardHeight={cardHeight}
            cardWidth={cardWidth}
            largeCards={largeCards}
          >
            {card.thumbnail_url && <CoverImage src={card.thumbnail_url} />}
            {card.type === 'video' && <PlayIcon large={false} />}
          </CarouselCard>
        ))}
      </Carousel>
      <CardFooter
        icon={<CircleInstReminderIcon color="instagram" />}
        message={storyAction}
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
  id: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  scheduledAt: PropTypes.number.isRequired,
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
