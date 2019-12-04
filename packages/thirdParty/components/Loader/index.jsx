import React from 'react';
import PropTypes from 'prop-types';

import RouteMonitor from '../RouteMonitor';

const Loader = ({
  appCues,
  intercom,
  helpScoutBeacon,
  location,
  modalsShowing,
  userId,
}) => (
  <RouteMonitor
    appCues={appCues}
    intercom={intercom}
    helpScoutBeacon={helpScoutBeacon}
    pathname={location.pathname}
    modalsShowing={modalsShowing}
    userId={userId}
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
  helpScoutBeacon: PropTypes.shape({
    loaded: PropTypes.bool,
  }).isRequired,
  modalsShowing: PropTypes.bool,
  userId: PropTypes.string,
};
Loader.defaultProps = {
  location: {},
  modalsShowing: false,
  userId: '',
};

export default Loader;
