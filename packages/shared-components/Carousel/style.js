import styled from 'styled-components';
import { grayLight } from '@bufferapp/ui/style/colors';

const cardMargin = 4;

export const Arrow = styled.button`
  cursor: pointer;
  top: 50%;
  transform: translateY(calc(-50% - 16px));
  position: absolute;
  left: ${props => (props.prev ? 0 : 'initial')};
  right: ${props => (props.prev ? 'initial' : 0)};
  background-color: ${grayLight};
  border: 1px solid ${grayLight};
  height: 32px;
  width: 32px;
  margin: 16px;
  outline: none;
  border-radius: 2px;
`;

export const CarouselContainer = styled.div`
  display: flex;
  padding-left: ${props => (props.editMode ? '16px' : 0)};
  width: calc(${props => props.cardWidth + (cardMargin * 2)}px *  ${$props => $props.totalCards});
  transform: ${props => `translateX(calc(-${props.cardWidth + (cardMargin * 2)}px * ${props.selectedItem}`}));
  transition: all 0.3s ease-out;
`;

export const SliderCarousel = styled.div`
  position: relative;
  overflow: hidden;
  margin: ${props => (props.editMode ? '0 -16px 0 -16px' : '0 16px 0 12px')};
`;

export const IconWrapper = styled.div`
  display: flex;
  opacity: 0.8;
`;
