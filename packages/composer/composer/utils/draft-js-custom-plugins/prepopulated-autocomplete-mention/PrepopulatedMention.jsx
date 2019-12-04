import React from 'react';
import PropTypes from 'prop-types';

import styles from './PrepopulatedMention.css';

const PrepopulatedMention = props => (
  <span className={styles.mention} spellCheck={false}>
    {props.children}
  </span>
);

PrepopulatedMention.propTypes = {
  children: PropTypes.node,
};

export default PrepopulatedMention;
