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
  onAddNoteClick,
  onDeleteStoryClick,
}) => {
  const cardsToRender = editMode ? getCardsToShow({ cards, totalCardsToShow }) : sortCards(cards);

  return cardsToRender.map(card => (
    <CarouselCardWrapper
      key={card}
      card={card}
      largeCards={largeCards}
      removeNotifications={removeNotifications}
      userData={userData}
      notifyError={notifyError}
      videoProcessingComplete={videoProcessingComplete}
      onAddNoteClick={onAddNoteClick}
      onDeleteStoryClick={onDeleteStoryClick}
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
  largeCards: PropTypes.string.isRequired,
  onAddNoteClick: PropTypes.func.isRequired,
  onDeleteStoryClick: PropTypes.func.isRequired,
};

export default CarouselCards;
