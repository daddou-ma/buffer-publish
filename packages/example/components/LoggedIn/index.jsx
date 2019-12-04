import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/components';

const LoggedIn = ({ loggedIn, translations }) => (
  <Text>{loggedIn ? translations.loggedIn : translations.loggedOut}</Text>
);

LoggedIn.propTypes = {
  loggedIn: PropTypes.bool,
  translations: PropTypes.shape({
    loggedIn: PropTypes.string,
    loggedOut: PropTypes.string,
  }).isRequired,
};

LoggedIn.defaultProps = {
  loggedIn: false,
};

export default LoggedIn;
