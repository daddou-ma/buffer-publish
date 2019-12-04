import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Cross } from '@bufferapp/ui/Icon';
import { white, transparent } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import Arrow from '../Arrow';

const ContentWrapper = styled.div`
  background-color: ${white};
  display: flex;
  flex: 1;
  border-radius: ${borderRadius};
`;

const SliderContainer = styled.div`
  display: flex;
  height: 100%;
`;

const ArrowColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${transparent};
  width: 48px;
`;

const CloseButton = styled(Cross)`
  position: absolute;
  top: 0;
  cursor: pointer;
  color: ${white};
  right: 18px;
`;

const Slider = ({
  children,
  onCloseClick,
  showLeftArrow,
  showRightArrow,
  onArrowClick,
}) => (
  <SliderContainer>
    <ArrowColumn>
      {showLeftArrow && <Arrow isLeft onClick={() => onArrowClick('left')} />}
    </ArrowColumn>
    <ContentWrapper>{children}</ContentWrapper>
    {onCloseClick && <CloseButton size="large" onClick={onCloseClick} />}
    <ArrowColumn>
      {showRightArrow && (
        <Arrow isLeft={false} onClick={() => onArrowClick('right')} />
      )}
    </ArrowColumn>
  </SliderContainer>
);

Slider.propTypes = {
  children: PropTypes.node.isRequired,
  onCloseClick: PropTypes.func,
  showLeftArrow: PropTypes.bool,
  showRightArrow: PropTypes.bool,
  onArrowClick: PropTypes.func,
};

Slider.defaultProps = {
  onCloseClick: null,
  showLeftArrow: true,
  showRightArrow: true,
  onArrowClick: () => {},
};

export default Slider;
