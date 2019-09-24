import React from 'react';
import PropTypes from 'prop-types';
import { CircleInstReminderIcon } from '@bufferapp/components';
import { CoverImage, PlayIcon } from '@bufferapp/publish-story-group-composer/components/Carousel/CardItem/styles';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import Card from '../Card';
import CardHeader from '../CardHeader';
import CardFooter from '../CardFooter';
import Carousel, { CarouselCard, getCardSizes } from '../Carousel';
import PostErrorBanner from '../PostErrorBanner';

const storiesQueueTranslations = translations['stories-queue'];

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
  userData,
}) => {
  const deletingMessage = isDeleting && 'Deleting...';
  const submittingMessage = isWorking && 'Sharing...';
  const actionMessage = deletingMessage || submittingMessage || '';
  const largeCards = false;
  const { cardWidth, cardHeight } = getCardSizes(largeCards);
  const {
    stories, creatorName, avatarUrl, createdAt, storyAction,
  } = storyDetails;
  const { tags } = userData;
  const hasStoriesMobileVersion = (
    tags ? tags.includes('has_instagram_stories_mobile') : false
  );

  return (
    <Card>
      {!hasStoriesMobileVersion
        && (
          <PostErrorBanner
            error={storiesQueueTranslations.bannerMobileTagText}
          />
        )
      }
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
  userData: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
};

Story.defaultProps = {
  isDeleting: false,
  isWorking: false,
  onDeleteConfirmClick: null,
  onEditClick: null,
  onShareNowClick: null,
  onPreviewClick: null,
  userData: {},
};

export default Story;
