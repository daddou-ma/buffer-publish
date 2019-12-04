import React from 'react';
import PropTypes from 'prop-types';

import styles from './Hashtag.css';

const Hashtag = props => (
  <span className={styles.hashtag} spellCheck={false}>
    {props.children}
  </span>
);

Hashtag.propTypes = {
  children: PropTypes.node,
};

export default Hashtag;
