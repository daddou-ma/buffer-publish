import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/BaseButton.css';

const Button = ({ className, ...restProps }) => (
  <button className={`${styles.button} ${className}`} {...restProps} />
);

Button.propTypes = {
  className: PropTypes.string,
};

Button.defaultProps = {
  className: '',
};

export default Button;
