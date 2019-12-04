import styled from 'styled-components';
import { grayLighter, blue } from '@bufferapp/ui/style/colors';

const cardMargin = 8;

export const ArrowWrapper = styled.div`
  position: absolute;
  left: ${props => (props.isLeft && props.largeCards ? '10px' : 'initial')};
  right: ${props => (props.isLeft ? 'initial' : props.largeCards ? '10px' : 0)};
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
`;

const getLeftScroll = ({ cardWidth, selectedItem }) => {
  let result = 0;
  if (selectedItem === 0) {
    return 0;
  }

  for (let i = 1; i <= selectedItem; i += 1) {
    if (i === 1) {
      result += cardWidth + 3 * (cardWidth / 5) + cardMargin * 2;
    } else {
      result += cardWidth + cardMargin;
    }
  }

  return result;
};

export const CarouselContainer = styled.div`
  display: flex;
  padding: ${props => (props.largeCards ? '8px 0px 8px 8px' : 0)};
  width: calc(${props => props.cardWidth + cardMargin}px *  ${$props =>
  $props.totalCardsToShow});
  transform: ${props => `translateX(calc(-${getLeftScroll(props)}px`}));
  transition: all 0.3s ease-out;
  left: ${props => (props.selectedItem % 2 === 0 ? 1 : 0)}px;
`;

export const CarouselCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: ${props =>
    props.largeCards
      ? `0 ${cardMargin}px 0 0px`
      : `16px ${cardMargin}px 16px 0px`};
  height: ${props => (props.cardHeight ? props.cardHeight : 198)}px;
  width: ${props => (props.cardWidth ? props.cardWidth : 110)}px;
  box-shadow: ${props =>
    props.isTarget && !props.card.empty ? `0px 0px 4px 4px ${blue}` : 'none'};
  background-color: ${grayLighter};
  position: relative;
  :focus {
    outline: none;
  }
`;

export const SliderCarousel = styled.div`
  position: relative;
  overflow: hidden;
  margin: ${props => (props.largeCards ? '0 -16px 0 -16px' : '0 8px 0 8px')};
`;

export const IconWrapper = styled.div`
  display: flex;
  opacity: 0.8;
`;
