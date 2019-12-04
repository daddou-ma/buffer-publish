/* eslint-disable jsx-a11y/anchor-has-content */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/A.css';

const A = ({ className, ...restProps }) => (
  <a className={`${styles.a} ${className}`} {...restProps} />
);

A.propTypes = {
  className: PropTypes.string,
};

A.defaultProps = {
  className: '',
};

export default A;
