import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue } from '@bufferapp/ui/style/colors';
import CheckmarkIcon from '@bufferapp/ui/Icon/Icons/Checkmark';
import { Text } from '@bufferapp/ui';

const IconStyle = styled.span`
  background: ${blue};
  border: 2px solid ${blue};
  box-sizing: borderBox;
  border-radius: 50%;
  color: white;
  vertical-align: middle;
  padding: 2px;
  display: inline-flex;
  margin-right: 8px;
`;

const FeatureWrapperStyle = styled.div`
  margin-bottom: 8px;
  text-align: left;
`;

const PlanFeatureList = ({
  feature,
}) => (
  <FeatureWrapperStyle key={feature}>
    <IconStyle>
      <CheckmarkIcon />
    </IconStyle>
    <Text>{feature}</Text>
  </FeatureWrapperStyle>
);

PlanFeatureList.propTypes = {
  feature: PropTypes.string.isRequired,
};

export default PlanFeatureList;
