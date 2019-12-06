import React from 'react';
import PropTypes from 'prop-types';

const SensitiveData = ({ children }) =>
  children ? <span className="sensitiveData">{children}</span> : null;

SensitiveData.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SensitiveData;
