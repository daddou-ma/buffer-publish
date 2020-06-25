import React from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash.clamp';
import Arrow from '@bufferapp/publish-shared-components/Arrow';
import { ImageDimensions } from '@bufferapp/publish-constants';
import { ArrowWrapper, CarouselContainer, SliderCarousel } from './style';

export const getCardSizes = (
  largeCards,
  large = ImageDimensions.regular,
  thumbnail = ImageDimensions.thumbnail
) => {
  if (largeCards) {
    return {
      cardWidth: large.width,
      cardHeight: large.height,
      maxPerPage: 5,
    };
  }
  return {
    cardWidth: thumbnail.width,
    cardHeight: thumbnail.height,
    maxPerPage: 8,
  };
};

const NavArrow = ({
  prev = false,
  hide = false,
  incrementBy = 1,
  selectedItem = 0,
  setSelectedItem = null,
  totalCardsToShow,
  largeCards,
}) => {
  if (hide) return null;
  const lowerBounds = 0;
  const upperBounds = totalCardsToShow - 1;

  return (
    <ArrowWrapper isLeft={prev} largeCards={largeCards}>
      <Arrow
        isLeft={prev}
        onClick={() => {
          setSelectedItem(
            clamp(selectedItem + incrementBy, lowerBounds, upperBounds)
          );
        }}
      />
    </ArrowWrapper>
  );
};

NavArrow.propTypes = {
  prev: PropTypes.bool,
  hide: PropTypes.bool,
  incrementBy: PropTypes.number,
  selectedItem: PropTypes.number,
  setSelectedItem: PropTypes.func,
  totalCardsToShow: PropTypes.number,
  largeCards: PropTypes.bool,
};

const shouldHideRightArrow = ({
  totalStories,
  selectedItem,
  maxPerPage,
  canUploadMore,
}) => {
  const total = canUploadMore ? totalStories + 1 : totalStories;
  return total - selectedItem < maxPerPage;
};

class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: props.initialSelectedItem || 0,
    };
  }

  setSelectedItem = item => {
    this.setState({
      selectedItem: item,
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { totalStories, children } = this.props;
    const {
      totalStories: nextTotalStories,
      children: nextChildren,
    } = nextProps;
    const { selectedItem } = this.state;
    const { selectedItem: nextSelectedItem } = nextState;

    if (
      totalStories !== nextTotalStories ||
      selectedItem !== nextSelectedItem ||
      children !== nextChildren
    ) {
      return true;
    }
    return false;
  }

  render() {
    const {
      totalCardsToShow,
      totalStories,
      children,
      largeCards,
      maxItemsPerPage,
    } = this.props;

    const { selectedItem } = this.state;
    const { cardWidth, cardHeight, maxPerPage } = getCardSizes(largeCards);

    const maxCardsToDisplay = maxItemsPerPage || maxPerPage;

    const canUploadMore = largeCards && totalStories < totalCardsToShow;
    const incrementBy =
      canUploadMore && totalStories - selectedItem === maxCardsToDisplay
        ? 2
        : 1;
    const decrementBy =
      canUploadMore && totalStories - selectedItem < maxCardsToDisplay
        ? -2
        : -1;

    return (
      <>
        <SliderCarousel largeCards={largeCards}>
          <CarouselContainer
            selectedItem={selectedItem}
            totalCardsToShow={totalCardsToShow}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            largeCards={largeCards}
          >
            {children}
          </CarouselContainer>
          <NavArrow
            prev
            hide={selectedItem <= 0}
            setSelectedItem={this.setSelectedItem}
            selectedItem={selectedItem}
            incrementBy={decrementBy}
            totalCardsToShow={totalCardsToShow}
            largeCards={largeCards}
          />
          <NavArrow
            hide={shouldHideRightArrow({
              totalStories,
              selectedItem,
              maxPerPage: maxCardsToDisplay,
              canUploadMore,
            })}
            setSelectedItem={this.setSelectedItem}
            selectedItem={selectedItem}
            incrementBy={incrementBy}
            totalCardsToShow={totalCardsToShow}
            largeCards={largeCards}
          />
        </SliderCarousel>
      </>
    );
  }
}

Carousel.propTypes = {
  largeCards: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
  initialSelectedItem: PropTypes.number,
  totalCardsToShow: PropTypes.number,
  totalStories: PropTypes.number,
  maxItemsPerPage: PropTypes.number,
};

Carousel.defaultProps = {
  largeCards: false,
  initialSelectedItem: 0,
  totalCardsToShow: 10,
  totalStories: 0,
  maxItemsPerPage: null,
  children: [],
};

export default Carousel;
export { CarouselCard } from './style';
