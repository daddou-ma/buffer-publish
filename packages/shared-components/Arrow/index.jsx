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
  padding: 0;
  :focus {
    box-shadow: none;
  }
`;

const Arrow = ({ isLeft, onClick }) => (
  <ArrowButton
    type="secondary"
    icon={isLeft ? <ArrowLeft /> : <ArrowRight />}
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
