import React from 'react';
import PropTypes from 'prop-types';

import AppCues from '../AppCues';

const Loader = ({
                    appCues,
                    location,
                  }) => (
                    <AppCues appCues={appCues} location={location} />
                  );

Loader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  appCues: PropTypes.shape({
    loaded: PropTypes.bool,
  }),
};
Loader.defaultProps = {
  location: {},
}


export default Loader;
