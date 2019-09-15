import React from 'react';
import PropTypes from 'prop-types';
import { FileUploadFormatsConfigs } from '@bufferapp/publish-composer/composer/AppConstants';
import { getCardSizes } from '@bufferapp/publish-shared-components/Carousel';
import { getCardsToShow, sortCards } from '../../../utils/Carousel';
import CardDragWrapper from '../CardDragWrapper';

const CarouselCards = ({
  totalCardsToShow,
  largeCards,
  editMode,
  userData,
  removeNotifications,
  notifyError,
  videoProcessingComplete,
  cards,
  uploadDraftFile,
  updateUploadProgress,
  monitorUpdateProgress,
  createNewFile,
  createImageThumbnail,
  uploadImageComplete,
  videoProcessingStarted,
  onAddNoteClick,
  onDeleteStoryClick,
  onDropCard,
}) => {
  const cardsToRender = editMode ? getCardsToShow({ cards, totalCardsToShow }) : sortCards(cards);
  const { cardWidth, cardHeight } = getCardSizes(largeCards);
  const maxAttachableMediaCount = totalCardsToShow - cards.length;
  const uploadFormatsConfig = new Map(FileUploadFormatsConfigs.MEDIA); // Clone config

  return cardsToRender.map(card => (
    <CardDragWrapper
      key={card.uploadTrackingId}
      card={card}
      largeCards={largeCards}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      onAddNoteClick={onAddNoteClick}
      onDeleteStoryClick={onDeleteStoryClick}
      maxAttachableMediaCount={maxAttachableMediaCount}
      userData={userData}
      removeNotifications={removeNotifications}
      notifyError={notifyError}
      videoProcessingComplete={videoProcessingComplete}
      uploadDraftFile={uploadDraftFile}
      updateUploadProgress={updateUploadProgress}
      monitorUpdateProgress={monitorUpdateProgress}
      createNewFile={createNewFile}
      createImageThumbnail={createImageThumbnail}
      uploadImageComplete={uploadImageComplete}
      videoProcessingStarted={videoProcessingStarted}
      editMode
      uploadFormatsConfig={uploadFormatsConfig}
      cardLimit={totalCardsToShow}
      onDropCard={onDropCard}
    />
  ));
};

CarouselCards.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    type: PropTypes.string,
    note: PropTypes.string,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  })),
  largeCards: PropTypes.bool.isRequired,
  onAddNoteClick: PropTypes.func.isRequired,
  onDeleteStoryClick: PropTypes.func.isRequired,
};

export default CarouselCards;
