/* eslint-disable react/prefer-stateless-function */
// Since it's helpful to have refs on inputs (e.g. to read their value), this
// component needs to be stateful.

import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/Input.css';

class Input extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    onChange: () => {},
  };

  render() {
    const { className, onChange, ...restProps } = this.props;

    return (
      <input
        className={`${styles.input} ${className}`}
        onChange={onChange}
        {...restProps}
      />
    );
  }
}

export default Input;
