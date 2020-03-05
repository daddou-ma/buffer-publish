import React from 'react';
import PropTypes from 'prop-types';

import RouteMonitor from '../RouteMonitor';

const Loader = ({ appCues, intercom, location }) => (
  <RouteMonitor
    appCues={appCues}
    intercom={intercom}
    pathname={location.pathname}
  />
);

Loader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  appCues: PropTypes.shape({
    loaded: PropTypes.bool,
    inProgress: PropTypes.bool,
  }).isRequired,
  intercom: PropTypes.shape({
    loaded: PropTypes.bool,
  }).isRequired,
};
Loader.defaultProps = {
  location: {},
};

export default Loader;
