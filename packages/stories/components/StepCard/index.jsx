import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { grayDarker } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { Text } from '@bufferapp/ui';

const StepWrapper = styled.div`
  font-size: 0;
`;

const StepImage = styled.img`
  border-radius: ${borderRadius};
  background-color: blue;
  height: 100%;
  width: 100%;
`;

const StepTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StepTitle = styled(Text)`
  margin: 18px 0;
`;

const StepNumber = styled(Text)`
  margin: 0;
  text-align: center;
  margin-right: 8px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  border-radius: 100%;
  background-color: ${grayDarker};
`;

const StepDescription = styled(Text)`
  margin: 0;
`;

const StepCard = ({ imageUrl, number, title, description }) => (
  <StepWrapper>
    <StepImage src={imageUrl} />
    <StepTitleWrapper>
      <StepNumber type="p" color="white">
        {number}
      </StepNumber>
      <StepTitle type="h3">{title}</StepTitle>
    </StepTitleWrapper>
    <StepDescription type="p">{description}</StepDescription>
  </StepWrapper>
);

StepCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  number: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

StepCard.defaultProps = {
  number: 1,
  description: '',
};

export default StepCard;
