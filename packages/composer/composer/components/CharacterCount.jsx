/**
 * Component that displays a character count based on two numbers:
 * the current number of characters, and the max.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/CharacterCount.css';

const CharacterCount = (props) => {
  const left = props.maxCount - props.count;
  const isAboveMax = left < 0;

  const className = [
    isAboveMax ? styles.aboveMaxCharacterCount : null,
    props.className,
  ].join(' ');

  return (
    <span
      className={className}
      aria-label={`${left} Characters left`}
    >
      {left}
    </span>
  );
};

CharacterCount.propTypes = {
  count: PropTypes.number.isRequired,
  maxCount: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default CharacterCount;
