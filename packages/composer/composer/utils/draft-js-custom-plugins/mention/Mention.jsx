import React from 'react';
import PropTypes from 'prop-types';

import styles from './Mention.css';

const Mention = props => (
  <span className={styles.mention}>{props.children}</span>
);

Mention.propTypes = {
  children: PropTypes.node,
};

export default Mention;
