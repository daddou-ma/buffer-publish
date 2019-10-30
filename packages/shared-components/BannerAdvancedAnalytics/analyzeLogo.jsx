import React from 'react';
import PropTypes from 'prop-types';

const AnalyzeLogo = ({ className }) => (
  <svg
    width="16"
    height="17"
    viewBox="0 0 16 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.1336 2.8703C3.28309 2.8703 0.167206 6.03021 0.167206 9.93515C0.167206 13.8401 3.28309 17 7.1336 17C10.9841 17 14.1 13.8401 14.1 9.93515H7.1336V2.8703Z"
      fill="#F3AFB9"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 8.00839C16 4.10346 12.8841 0.943542 9.0336 0.943542V8.00839H16Z"
      fill="#132062"
    />
  </svg>
);

AnalyzeLogo.propTypes = {
  className: PropTypes.string,
};

AnalyzeLogo.defaultProps = {
  className: '',
};

export default AnalyzeLogo;
