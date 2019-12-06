import React from 'react';
import PropTypes from 'prop-types';

import styles from './PrepopulatedHashtag.css';

const PrepopulatedHashtag = props => (
  <span className={styles.hashtag} spellCheck={false}>
    {props.children}
  </span>
);

PrepopulatedHashtag.propTypes = {
  children: PropTypes.node,
};

export default PrepopulatedHashtag;
