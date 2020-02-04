import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { Text } from '@bufferapp/ui';
import { StepNumber } from '@bufferapp/publish-shared-components';

const StepText = styled(Text)`
  flex: 1;
  margin-left: 8px;
`;

const StepContainer = styled.li`
  display: flex;
  margin: 18px 0;
  align-items: baseline;
`;

const StepList = ({ steps }) => (
  <ul>
    {steps.map((item, index) => (
      <StepContainer key={uuid()}>
        <StepNumber number={index + 1} />
        <StepText type="p">{item}</StepText>
      </StepContainer>
    ))}
  </ul>
);

StepList.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default StepList;
