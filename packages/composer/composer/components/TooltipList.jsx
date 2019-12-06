/**
 * Component that takes an array of messages and generates list markup for use in a tooltip
 */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/TooltipList.css';

const TooltipList = props => {
  const tooltipListClassName =
    props.messages.length === 1
      ? styles.tooltipSingleItemList
      : styles.tooltipList;

  return (
    <ul className={tooltipListClassName}>
      {props.messages.map(message => (
        <li className={styles.tooltipListItem} key={message}>
          {message}
        </li>
      ))}
    </ul>
  );
};

TooltipList.propTypes = {
  messages: PropTypes.array.isRequired,
};

export default TooltipList;
