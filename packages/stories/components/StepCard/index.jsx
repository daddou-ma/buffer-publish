import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { Text } from '@bufferapp/ui';
import { StepNumber } from '@bufferapp/publish-shared-components';

const StepWrapper = styled.div`
  font-size: 0;
  width: calc(100% / 3);
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  padding: 0 2%;
`;

const StepImage = styled.img`
  border-radius: ${borderRadius};
  width: 100%;
  object-fit: contain;
`;

const StepTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StepTitle = styled(Text)`
  margin: 18px 0;
  flex: 1;
`;

const StepDescription = styled(Text)`
  margin: 0;
`;

const StepCard = ({ imageUrl, number, title, description }) => (
  <StepWrapper>
    <StepImage src={imageUrl} />
    <StepTitleWrapper>
      <StepNumber number={number} />
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
