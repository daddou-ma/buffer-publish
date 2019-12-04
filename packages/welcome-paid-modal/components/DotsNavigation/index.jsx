import React from 'react';
import PropTypes from 'prop-types';

import {
  DotstyleUl,
  DotstyleA,
  DotstyleLi,
  DotstyleLiCurrentA,
  DivDotStyle,
} from './style';

const createSteps = (currentStep, nSteps, onClickCallback) => {
  const ul = [];

  for (let i = 1; i <= nSteps; i += 1) {
    ul.push(
      <DotstyleLi key={i}>
        {currentStep === i && (
          <DotstyleLiCurrentA
            key={i}
            href="#"
            onClick={() => onClickCallback(i)}
          >
            Step {i}
          </DotstyleLiCurrentA>
        )}

        {currentStep !== i && (
          <DotstyleA key={i} href="#" onClick={() => onClickCallback(i)}>
            Step {i}
          </DotstyleA>
        )}
      </DotstyleLi>
    );
  }
  return ul;
};

const DotsNavigation = ({ currentStep, onClickCallback, nSteps }) => (
  <DivDotStyle>
    <DotstyleUl>{createSteps(currentStep, nSteps, onClickCallback)}</DotstyleUl>
  </DivDotStyle>
);

DotsNavigation.propTypes = {
  currentStep: PropTypes.number.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  nSteps: PropTypes.number.isRequired,
};

export default DotsNavigation;
