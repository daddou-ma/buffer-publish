import React from 'react';
import PropTypes from 'prop-types';

import RouteMonitor from '../RouteMonitor';

const Loader = ({ appCues, zendeskWidget, location }) => (
  <RouteMonitor
    appCues={appCues}
    zendeskWidget={zendeskWidget}
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
  zendeskWidget: PropTypes.shape({
    loaded: PropTypes.bool,
  }).isRequired,
};
Loader.defaultProps = {
  location: {},
};

export default Loader;
