import React from 'react';
import PropTypes from 'prop-types';
import CarouselCardWrapper from '../CarouselCardWrapper';
import { getCardsToShow, sortCards } from '../../../utils/Carousel';

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
}) => {
  const cardsToRender = editMode ? getCardsToShow({ cards, totalCardsToShow }) : sortCards(cards);
  const maxAttachableMediaCount = totalCardsToShow - cards.length;

  return cardsToRender.map(card => (
    <CarouselCardWrapper
      key={card.uploadTrackingId}
      card={card}
      largeCards={largeCards}
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
