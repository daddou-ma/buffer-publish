import React from 'react';
import PropTypes from 'prop-types';

import styles from './Highlighter.css';

const Highlighter = props => (
  <span className={styles.highlighted}>{props.children}</span>
);

Highlighter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Highlighter;
