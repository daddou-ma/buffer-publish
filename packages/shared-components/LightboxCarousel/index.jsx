import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from '@bufferapp/components';
import { Cross } from '@bufferapp/ui/Icon';
import { white, transparent } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import Arrow from '../Arrow';

const ContentWrapper = styled.div`
  background-color: ${white};
  display: flex;
  height: ${({ height }) => (height)}px;
  width: ${({ width }) => (width)}px;
  border-radius: ${borderRadius};
`;

const Modal = styled.div`
  display: flex;
  height: ${({ height }) => (height)}px;
`;

const ArrowColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${transparent};
  width: 48px;
`;

const CloseButton = styled(Cross)`
  position: absolute;
  right: 0;
  cursor: pointer;
  color: ${white};
  right: 18px;
`;

const LightboxCarousel = ({
  children,
  height,
  width,
  onOverlayClick,
  onCloseClick,
  showLeftArrow,
  showRightArrow,
  onArrowClick,
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <Modal height={height}>
      <ArrowColumn>
        {showLeftArrow
          && (
            <Arrow
              isLeft
              onClick={() => onArrowClick('left')}
            />
          )
        }
      </ArrowColumn>
      <ContentWrapper height={height} width={width}>
        {children}
      </ContentWrapper>
      <CloseButton size="large" onClick={onCloseClick} />
      <ArrowColumn>
        {showRightArrow
          && (
            <Arrow
              isLeft={false}
              onClick={() => onArrowClick('right')}
            />
          )
        }
      </ArrowColumn>
    </Modal>
  </Popover>
);

LightboxCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  onOverlayClick: PropTypes.func,
  onCloseClick: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  showLeftArrow: PropTypes.bool,
  showRightArrow: PropTypes.bool,
  onArrowClick: PropTypes.func,
};

LightboxCarousel.defaultProps = {
  onOverlayClick: null,
  onCloseClick: null,
  height: 592,
  width: 629,
  showLeftArrow: true,
  showRightArrow: true,
  onArrowClick: () => {},
};

export default LightboxCarousel;
