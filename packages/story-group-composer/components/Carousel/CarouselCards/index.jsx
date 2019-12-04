import React from 'react';
import PropTypes from 'prop-types';
import { FileUploadFormatsConfigs } from '@bufferapp/publish-composer/composer/AppConstants';
import { getCardSizes } from '@bufferapp/publish-shared-components/Carousel';
import { getCardsToShow, sortCards } from '../../../utils/Carousel';
import CardDragWrapper from '../CardDragWrapper';
import CardItem from '../CardItem';

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
  translations,
}) => {
  const cardsToRender = editMode
    ? getCardsToShow({ cards, totalCardsToShow })
    : sortCards(cards);
  const { cardWidth, cardHeight } = getCardSizes(largeCards);
  const maxAttachableMediaCount = totalCardsToShow - cards.length;
  const uploadFormatsConfig = new Map(FileUploadFormatsConfigs.STORIES); // Clone config

  return cardsToRender.map((card, index) => (
    <CardDragWrapper
      index={index}
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
      totalCards={cards.length}
      onDropCard={onDropCard}
      translations={translations}
    />
  ));
};

CarouselCards.propTypes = {
  cards: PropTypes.arrayOf(CardItem.propTypes.card),
  largeCards: PropTypes.bool.isRequired,
  onAddNoteClick: PropTypes.func.isRequired,
  onDeleteStoryClick: PropTypes.func.isRequired,
};

export default CarouselCards;
