import React from 'react';
import PropTypes from 'prop-types';

import styles from './ImportedMention.css';

const ImportedMention = props => (
  <span className={styles.mention} spellCheck={false}>
    {props.children}
  </span>
);

ImportedMention.propTypes = {
  children: PropTypes.node,
};

export default ImportedMention;
