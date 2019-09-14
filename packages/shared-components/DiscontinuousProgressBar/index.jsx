import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '@bufferapp/ui/style/colors';

const ProgressElements = styled.div`
  background: ${white};
  border-radius: 1px;
  width: 100%;
  height: 2px;
`;

const ProgressElementsLeft = styled(ProgressElements)`
  opacity: 0.4;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;

  *:not(:last-child) {
    margin-right: 1.33px;
  }
`;

const renderBars = (numberBars, type) => {
  const ComponentToRender = type === 'left' ? (<ProgressElementsLeft />) : (<ProgressElements />);

  const bars = [];
  for (let i = 0; i < numberBars; i += 1) {
    bars.push(ComponentToRender);
  }

  return (
    <Fragment>
      {bars}
    </Fragment>
  );
};

const DiscountinuousProgressBar = ({
  totalElementsIndex,
  currentElementIndex,
}) => {
  const ElementsLeftShow = totalElementsIndex - currentElementIndex;

  return (
    <ProgressContainer>
      {renderBars(currentElementIndex)}
      {renderBars(ElementsLeftShow, 'left')}
    </ProgressContainer>
  );
};

DiscountinuousProgressBar.propTypes = {
  totalElementsIndex: PropTypes.number.isRequired,
  currentElementIndex: PropTypes.number.isRequired,
};

export default DiscountinuousProgressBar;
