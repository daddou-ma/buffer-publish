import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Select.css';

const Select = ({ className, ...restProps }) => (
  <select className={`${styles.select} ${className}`} {...restProps} />
);

Select.propTypes = {
  className: PropTypes.string,
};

Select.defaultProps = {
  className: '',
};

export default Select;
