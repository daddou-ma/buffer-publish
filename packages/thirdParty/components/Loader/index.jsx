import React from 'react';
import PropTypes from 'prop-types';

import RouteMonitor from '../RouteMonitor';

const Loader = ({ appCues, location }) => (
  <RouteMonitor appCues={appCues} pathname={location.pathname} />
);

Loader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  appCues: PropTypes.shape({
    loaded: PropTypes.bool,
    inProgress: PropTypes.bool,
  }).isRequired,
};
Loader.defaultProps = {
  location: {},
};

export default Loader;
