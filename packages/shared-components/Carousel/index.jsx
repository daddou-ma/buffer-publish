import React from 'react';
import PropTypes from 'prop-types';
import clamp from 'lodash.clamp';
import Arrow from '@bufferapp/publish-shared-components/Arrow';

import {
  ArrowWrapper,
  CarouselContainer,
  SliderCarousel,
} from './style';

export const getCardSizes = (largeCards) => {
  if (largeCards) return { cardWidth: 180, cardHeight: 320, maxPerPage: 4 };
  return { cardWidth: 110, cardHeight: 198, maxPerPage: 7 };
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
          setSelectedItem(clamp(selectedItem + incrementBy, lowerBounds, upperBounds));
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

const shouldHideRightArrow = (
  total,
  selectedItem,
  maxPerPage,
) => total - selectedItem - maxPerPage < 0;

class Carousel extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      selectedItem: props.initialSelectedItem || 0,
    };
  }

  setSelectedItem = (item) => {
    this.setState({
      selectedItem: item,
    });
  };

  render () {
    const {
      totalCardsToShow,
      children,
      largeCards,
    } = this.props;

    const { selectedItem } = this.state;
    const { cardWidth, cardHeight, maxPerPage } = getCardSizes(largeCards);

    return (
      <React.Fragment>
        <SliderCarousel
          largeCards={largeCards}
        >
          <CarouselContainer
            selectedItem={selectedItem}
            totalCardsToShow={totalCardsToShow}
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            largeCards={largeCards}
          >
            { children }
          </CarouselContainer>
          <NavArrow
            prev
            hide={selectedItem <= 0}
            setSelectedItem={this.setSelectedItem}
            selectedItem={selectedItem}
            incrementBy={-1}
            totalCardsToShow={totalCardsToShow}
            largeCards={largeCards}
          />
          <NavArrow
            hide={shouldHideRightArrow(totalCardsToShow, selectedItem, maxPerPage)}
            setSelectedItem={this.setSelectedItem}
            selectedItem={selectedItem}
            incrementBy={+1}
            totalCardsToShow={totalCardsToShow}
            largeCards={largeCards}
          />
        </SliderCarousel>
      </React.Fragment>
    );
  }
}

Carousel.propTypes = {
  largeCards: PropTypes.bool,
  children: PropTypes.element,
  initialSelectedItem: PropTypes.number,
  totalCardsToShow: PropTypes.number,
};

Carousel.defaultProps = {
  largeCards: false,
  initialSelectedItem: 0,
  totalCardsToShow: 15,
};

export default Carousel;
export {
  CarouselCard,
} from './style';
