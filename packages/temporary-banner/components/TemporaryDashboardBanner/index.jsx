import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@bufferapp/components';
import {
  fillColor,
  outerSpace,
  outerSpaceLight,
} from '@bufferapp/components/style/color';

const styling = {
  backgroundColor: fillColor,
  color: outerSpace,
  padding: '5px',
  textAlign: 'center',
  borderBottom: `1px solid ${outerSpaceLight}`,
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
      <Text color={outerSpace} size="mini">
        {temporaryDashboard.content}
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
