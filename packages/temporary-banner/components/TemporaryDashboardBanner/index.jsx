import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@bufferapp/components';

const styling = {
  backgroundColor: 'rgba(255, 198, 171, 0.75)',
  color: '#662D12',
  padding: '16px',
  textAlign: 'left',
  lineHeight: '22px',
};

const dashboardBanner = 'temporary-dashboard-banner';

const getEnabledApplicationMode = (tag, enabledApplicationModes) =>
  enabledApplicationModes.filter(mode => mode.tag === tag)[0];

const TemporaryDashboardBanner = ({
    enabledApplicationModes,
  }) => {
  const temporaryDashboard = getEnabledApplicationMode(dashboardBanner, enabledApplicationModes);
  if (!temporaryDashboard) {
    return null;
  }

  return (
    <div style={styling}>
      <Text color='#662D12' size="mini">
        <div dangerouslySetInnerHTML={{__html: temporaryDashboard.content}} />
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
