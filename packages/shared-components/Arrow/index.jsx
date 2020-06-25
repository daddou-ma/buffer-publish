import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';
import { ArrowLeft, ArrowRight } from '@bufferapp/ui/Icon';

const ArrowButton = styled(Button)`
  width: 32px;
  height: 32px;
  border-radius: 3px;
  justify-content: center;
  :focus {
    box-shadow: none;
  }
`;

const ArrowLeftStyled = styled(ArrowLeft)`
  min-width: 16px;
  margin-left: -8px;
`;

const ArrowRightStyled = styled(ArrowRight)`
  min-width: 16px;
  margin-left: -8px;
`;

const Arrow = ({ isLeft, onClick }) => (
  <ArrowButton
    type="secondary"
    icon={isLeft ? <ArrowLeftStyled /> : <ArrowRightStyled />}
    hasIconOnly
    isLeft={isLeft}
    onClick={onClick}
  />
);

Arrow.propTypes = {
  isLeft: PropTypes.bool,
  onClick: PropTypes.func,
};

Arrow.defaultProps = {
  isLeft: false,
  onClick: () => {},
};

export default Arrow;
