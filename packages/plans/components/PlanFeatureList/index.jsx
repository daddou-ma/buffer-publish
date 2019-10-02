import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { blue } from '@bufferapp/ui/style/colors';
import { Text, Tooltip } from '@bufferapp/ui';
import { Checkmark, Info } from '@bufferapp/ui/Icon';

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

const TooltipStyle = styled.span`
  text-align: unset;
  vertical-align: middle;
  display: inline-flex;
  margin-left: 8px;
  padding: 2px;
  color: gray;
`;

const PlanFeatureList = ({
  feature,
  tooltip,
}) => (
  <FeatureWrapperStyle key={feature}>
    <IconStyle>
      <Checkmark />
    </IconStyle>
    <Text>{feature}</Text>
    <TooltipStyle>
      {tooltip !== '' && (
        <Tooltip
          label={tooltip}
          position="right"
        >
          <Info size="medium" />
        </Tooltip>
      )}
    </TooltipStyle>
  </FeatureWrapperStyle>
);

PlanFeatureList.propTypes = {
  feature: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default PlanFeatureList;
