import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash.clamp';
import { grayLighter } from '@bufferapp/ui/style/colors';
import ArrowLeft from '@bufferapp/ui/Icon/Icons/ArrowLeft';
import ArrowRight from '@bufferapp/ui/Icon/Icons/ArrowRight';
import { CirclePlayIcon } from '@bufferapp/components/Icon/Icons';

import * as Styles from './style';

const cardsToShow = 15;
const lowerBounds = 0;

const getCardsToShow = ({ cards = [] }) => {
  const cardList = [];
  const sortedCards = cards.sort((a, b) => {
    if (a.order > b.order) return 1;
    return -1;
  });
  for (let i = 0; i < cardsToShow; i += 1) {
    const card = sortedCards[i];
    if (card) {
      cardList.push(card);
    } else {
      cardList.push({ order: i });
    }
  }
  return cardList;
};

const NavArrow = ({
  prev = false,
  hide = false,
  incrementBy = 1,
  selectedItem = 0,
  setSelectedItem = null,
  upperBounds,
}) => {
  if (hide) return null;
  return (
    <Styles.Arrow
      prev={prev}
      onClick={() => {
        setSelectedItem(clamp(selectedItem + incrementBy, lowerBounds, upperBounds));
      }}
    >
      {prev ? <ArrowLeft /> : <ArrowRight />}
    </Styles.Arrow>
  );
};

const PlayIcon = () => (
  <Styles.IconWrapper>
    <CirclePlayIcon color={grayLighter} size={{ width: '40px' }} />
  </Styles.IconWrapper>
);

/**
 * Carousel on edit mode, handling from the composer
 */
const CarouselEdit = ({
  cardWidth,
  cardHeight,
}) => (
  getCardsToShow({ cards: [] }).map(card => (
    <Styles.CarouselCard
      key={card.order}
      card={card}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      editMode
    >
      <div>
        Edit Mode
        {/* TODO: Add <UploadZone /> */}
      </div>
    </Styles.CarouselCard>
  ))
);

/**
 * Carousel on view mode, to display images in the queue
 */
const CarouselView = ({
  cards,
  cardWidth,
  cardHeight,
}) => {
  const sortedCards = cards.sort((a, b) => {
    if (a.order > b.order) return 1;
    return -1;
  });
  return sortedCards.map(card => (
    <Styles.CarouselCard
      key={card.order}
      card={card}
      cardHeight={cardHeight}
      cardWidth={cardWidth}
      editMode={false}
    >
      {card.type === 'video' && <PlayIcon />}
    </Styles.CarouselCard>
  ));
};

/**
 * Carousel component adapts the size depending on the editMode
 * If is editMode, it's used from the composer and is used to upload media
 * While on the queue is used to display story groups media already uloaded.
 */
const Carousel = ({
  cards,
  editMode,
  initialSelectedItem = 0,
}) => {
  const [selectedItem, setSelectedItem] = useState(initialSelectedItem);
  const total = editMode ? cardsToShow : cards.length;
  const upperBounds = editMode ? cardsToShow - 1 : total - 1;
  const cardWidth = editMode ? 180 : 110;
  const cardHeight = editMode ? 320 : 198;
  const maxPerPage = editMode ? 4 : 7;
  const hide = total - selectedItem - maxPerPage < 0;

  return (
    <React.Fragment>
      <Styles.SliderCarousel
        editMode={editMode}
      >
        <Styles.CarouselContainer
          selectedItem={selectedItem}
          totalCards={total}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          editMode={editMode}
        >
          {editMode
            ? <CarouselEdit cardWidth={cardWidth} cardHeight={cardHeight} />
            : <CarouselView cards={cards} cardWidth={cardWidth} cardHeight={cardHeight} />
          }
        </Styles.CarouselContainer>
        <NavArrow
          prev
          hide={selectedItem <= 0}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          incrementBy={-1}
          upperBounds={upperBounds}
        />
        <NavArrow
          hide={hide}
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          incrementBy={+1}
          upperBounds={upperBounds}
        />
      </Styles.SliderCarousel>
    </React.Fragment>
  );
};

Carousel.propTypes = {
  cards: PropTypes.arrayOf(PropTypes.shape({
    order: PropTypes.string,
    type: PropTypes.string,
    note: PropTypes.string,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  })),
  editMode: PropTypes.bool,
  initialSelectedItem: PropTypes.number,
};

NavArrow.propTypes = {
  prev: PropTypes.bool,
  hide: PropTypes.bool,
  incrementBy: PropTypes.number,
  selectedItem: PropTypes.number,
  setSelectedItem: PropTypes.func,
  upperBounds: PropTypes.number,
};

Carousel.defaultProps = {
  cards: [],
  editMode: false,
};

export default Carousel;
