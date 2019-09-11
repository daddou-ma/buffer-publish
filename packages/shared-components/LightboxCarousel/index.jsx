import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import { ArrowLeft, ArrowRight, Cross } from '@bufferapp/ui/Icon';
import { white, transparent } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';

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

const ArrowButton = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  justify-content: center;
  padding: 0;
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
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <Modal height={height}>
      <ArrowColumn>
        <ArrowButton
          type="secondary"
          icon={<ArrowLeft />}
          hasIconOnly
          onClick={() => {}}
          label="Click Me"
        />
      </ArrowColumn>
      <ContentWrapper height={height} width={width}>
        {children}
      </ContentWrapper>
      <CloseButton size="large" onClick={onCloseClick} />
      <ArrowColumn>
        <ArrowButton
          type="secondary"
          icon={<ArrowRight />}
          hasIconOnly
          onClick={() => {}}
          label="Click Me"
        />
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

};

LightboxCarousel.defaultProps = {
  onOverlayClick: null,
  onCloseClick: null,
  height: 592,
  width: 629,
};

export default LightboxCarousel;
