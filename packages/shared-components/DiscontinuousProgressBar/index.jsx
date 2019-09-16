import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { white } from '@bufferapp/ui/style/colors';

export const ProgressBarFilled = styled.div`
  background: ${white};
  border-radius: 1px;
  width: 100%;
  height: 2px;
`;

export const ProgressBar = styled(ProgressBarFilled)`
  opacity: 0.4;
`;

const ProgressContainer = styled.div`
  width: 100%;
  display: flex;

  *:not(:last-child) {
    margin-right: 1.33px;
  }
`;

const renderBars = (numberOfBarsFilled, totalNumberOfBars) => {
  const bars = [];
  for (let i = 0; i < totalNumberOfBars; i += 1) {
    if (i < numberOfBarsFilled) {
      bars.push(<ProgressBarFilled />);
    } else {
      bars.push(<ProgressBar />);
    }
  }

  return (
    <Fragment>
      {bars}
    </Fragment>
  );
};

const DiscountinuousProgressBar = ({
  numberOfBarsFilled,
  totalNumberOfBars,
}) => (
  <ProgressContainer>
    {renderBars(numberOfBarsFilled, totalNumberOfBars)}
  </ProgressContainer>
);

DiscountinuousProgressBar.propTypes = {
  numberOfBarsFilled: PropTypes.number.isRequired,
  totalNumberOfBars: PropTypes.number.isRequired,
};

export default DiscountinuousProgressBar;
