import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '@bufferapp/ui';
import { grayDarker } from '@bufferapp/ui/style/colors';

const StepNumberStyles = styled(Text)`
  margin: 0;
  text-align: center;
  margin-right: 8px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 100%;
  background-color: ${grayDarker};
`;

const StepNumber = ({ number }) => (
  <StepNumberStyles type="p" color="white">
    {number}
  </StepNumberStyles>
);

StepNumber.propTypes = {
  number: PropTypes.number.isRequired,
};

export default StepNumber;
