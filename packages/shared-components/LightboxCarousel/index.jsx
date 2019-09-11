import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import { ArrowLeft, ArrowRight } from '@bufferapp/ui/Icon';
import { white, transparent, red, grayLight, grayDarker, grayDark } from '@bufferapp/ui/style/colors';
import { fontWeightBold } from '@bufferapp/ui/style/fonts';

const ContentWrapper = styled.div`
  background-color: ${white};
  display: flex;
  height: 592px;
  width: 629px;
`;

const Modal = styled.div`
  display: flex;
  height: 592px;
`;

const ArrowColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${red};
  width: 48px;
`;

const RightColumn = styled.div`
  background-color: ${red};
  width: 48px;
`;

const ArrowButton = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  justify-content: center;
  padding: 0;
`;

const LightboxCarousel = ({
  children,
  height,
  width,
  onOverlayClick,
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <Modal>
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
        <p></p>
      </ContentWrapper>
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
};

LightboxCarousel.defaultProps = {
};

export default LightboxCarousel;
