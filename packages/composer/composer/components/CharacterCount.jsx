/**
 * Component that displays a character count based on two numbers:
 * the current number of characters, and the max.
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/CharacterCount.css';

const CharacterCount = props => {
  const left = props.maxCount - props.count;
  const isAboveMax = left < 0;
  const ariaLabel =
    props.type === 'hashtag'
      ? `${left} Hashtags left`
      : `${left} Characters left`;

  const className = [
    isAboveMax ? styles.aboveMaxCharacterCount : null,
    props.className,
  ].join(' ');

  return (
    <div>
      <span className={className} aria-label={ariaLabel}>
        {props.type === 'hashtag' ? `# Remaining: ${left}` : left}
      </span>
    </div>
  );
};

CharacterCount.propTypes = {
  count: PropTypes.number.isRequired,
  maxCount: PropTypes.number.isRequired,
  className: PropTypes.string,
  type: PropTypes.string,
};

CharacterCount.defaultProps = {
  className: null,
  type: 'character',
};

export default CharacterCount;
