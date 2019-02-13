import React from 'react';
import PropTypes from 'prop-types';

import styles from './dotsNavigation.css';

const DotsNavigation = ({ step, onClickCallback }) => (
  <div className={styles.divDotStyle}>
    <ul className={styles.dotstyleUl}>
      <li className={styles.dotstyleLi}>
        <a className={step === 1 ? styles.dotstyleLiCurrentA : styles.dotstyleA} href="#" onClick={() => onClickCallback(1)}>Step 1</a>
      </li>
      <li className={styles.dotstyleLi}>
        <a className={step === 2 ? styles.dotstyleLiCurrentA : styles.dotstyleA} href="#" onClick={() => onClickCallback(2)}>Step 2</a>
      </li>
    </ul>
  </div>
);

DotsNavigation.propTypes = {
  step: PropTypes.number.isRequired,
  onClickCallback: PropTypes.func.isRequired,
};


export default DotsNavigation;
