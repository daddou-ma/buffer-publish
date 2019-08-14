import React from 'react';
import PropTypes from 'prop-types';

import styles from './dotsNavigation.css';

const createSteps = (currentStep, nSteps, onClickCallback) => {
  let ul = [];

  for (let i = 1; i <= nSteps; i += 1) {
    ul.push(
      <li className={styles.dotstyleLi} key={i}>
        <a
          key={i}
          className={currentStep === i ? styles.dotstyleLiCurrentA : styles.dotstyleA}
          href="#"
          onClick={() => onClickCallback(i)}
        >
          Step {i}
        </a>
      </li>,
    );
  }
  return ul;
};


const DotsNavigation = ({ currentStep, onClickCallback, nSteps }) => (
  <div className={styles.divDotStyle}>
    <ul className={styles.dotstyleUl}>
      {createSteps(currentStep, nSteps, onClickCallback) }
    </ul>
  </div>
);

DotsNavigation.propTypes = {
  currentStep: PropTypes.number.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  nSteps: PropTypes.number.isRequired,
};


export default DotsNavigation;
