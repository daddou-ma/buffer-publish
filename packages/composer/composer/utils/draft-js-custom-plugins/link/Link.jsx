import React from 'react';
import PropTypes from 'prop-types';

import styles from './Link.css';

const Link = props => <span className={styles.link}>{props.children}</span>;

Link.propTypes = {
  children: PropTypes.node,
};

export default Link;
