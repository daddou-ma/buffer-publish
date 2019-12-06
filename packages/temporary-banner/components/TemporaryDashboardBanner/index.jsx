import React from 'react';
import PropTypes from 'prop-types';

import Banner from '@bufferapp/ui/Banner';

const dashboardBanner = 'temporary-dashboard-banner';

const getContainerStyle = hidden => ({
  display: hidden ? 'none' : 'flex',
});

class TemporaryDashboardBanner extends React.Component {
  constructor() {
    super();

    this.state = {
      hidden: false,
    };
  }

  getEnabledApplicationMode(tag, enabledApplicationModes) {
    return enabledApplicationModes.filter(mode => mode.tag === tag)[0];
  }

  render() {
    const { hidden } = this.state;
    const { enabledApplicationModes } = this.props;

    if (!enabledApplicationModes) {
      return null;
    }

    const temporaryDashboard = this.getEnabledApplicationMode(
      dashboardBanner,
      enabledApplicationModes
    );

    if (!temporaryDashboard) {
      return null;
    }

    return (
      <div style={getContainerStyle(hidden)}>
        <Banner
          themeColor="orange"
          customHTML={{ __html: temporaryDashboard.content }}
          onCloseBanner={() => this.setState({ hidden: true })}
        />
      </div>
    );
  }
}

TemporaryDashboardBanner.propTypes = {
  enabledApplicationModes: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.string)
  ),
};

TemporaryDashboardBanner.defaultProps = {
  enabledApplicationModes: [],
};

export default TemporaryDashboardBanner;
