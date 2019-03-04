import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@bufferapp/components';

const textColor = 'white';

const styling = {
  backgroundColor: '#1F35B3',
  color: textColor,
  padding: '5px',
  textAlign: 'center',
};

const buttonStyle = {
  color: textColor,
  cursor: 'pointer',
  display: 'inline-block',
  margin: '0 0 0 1rem',
  padding: '0.5rem',
  backgroundColor: '#121E66',
  border: '1px solid #121E66',
  borderRadius: '4px',
  outline: 'none',
};

const TemporaryDashboardBanner = ({
    enabledApplicationModes,
  }) => {
  console.log('HERE', enabledApplicationModes);
  const temporaryDashboard = enabledApplicationModes['temporary-dashboard-banner'];
  if (!enabledApplicationModes || (enabledApplicationModes.length > 0 && !temporaryDashboard)) {
    return null;
  }

  return (
    <div style={styling}>
      <Text color={textColor} size="mini">
        SOME TEXT
      </Text>
    </div>
  );
};

TemporaryDashboardBanner.propTypes = {
  enabledApplicationModes: PropTypes.arrayOf({
    mode: PropTypes.string,
  }),
};

TemporaryDashboardBanner.defaultProps = {
  enabledApplicationModes: [],
};

export default TemporaryDashboardBanner;
