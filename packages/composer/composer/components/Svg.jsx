import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Svg.css';

const Svg = ({ className, ...restProps }) => (
  <svg className={`${styles.svg} ${className}`} {...restProps} />
);

Svg.propTypes = {
  className: PropTypes.string,
};

Svg.defaultProps = {
  className: '',
};

export default Svg;
