import React from 'react';
import PropTypes from 'prop-types';

import Banner from '@bufferapp/ui/Banner';

const dashboardBanner = 'temporary-dashboard-banner';

const getContainerStyle = hidden => ({
  display: hidden ? 'none' : 'flex',
});

class TemporaryDashboardBanner extends React.Component {

  constructor () {
    super();

    this.state = {
      hidden: false,
    };
  }

  getEnabledApplicationMode (tag, enabledApplicationModes) {
    return enabledApplicationModes.filter(mode => mode.tag === tag)[0];
  }

  render () {
    const { hidden } = this.state;
    const { enabledApplicationModes, hasLinkedinProfiles } = this.props;

    if (!enabledApplicationModes) {
      return null;
    }

    const temporaryDashboard =
      this.getEnabledApplicationMode(dashboardBanner, enabledApplicationModes);

    const shouldShowBanner = temporaryDashboard || hasLinkedinProfiles;

    if (!shouldShowBanner) {
      return null;
    }

    return (
      <div style={getContainerStyle(hidden)}>
        {temporaryDashboard
        && (
          <Banner
            themeColor="orange"
            customHTML={{ __html: temporaryDashboard.content }}
            onCloseBanner={() => this.setState({ hidden: true })}
          />
        )}
        {hasLinkedinProfiles
        && (
          <Banner
            themeColor="orange"
            customHTML={{ __html: 'Due to a permissions update from LinkedIn, we’ll need to reconnect your account. Please take a moment to <a href="https://buffer.com/manage">reconnect</a> now.' }}
            onCloseBanner={() => this.setState({ hidden: true })}
          />
        )}
      </div>
    );
  }
}

TemporaryDashboardBanner.propTypes = {
  enabledApplicationModes: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.string,
    ),
  ),
  hasLinkedinProfiles: PropTypes.bool,
};

TemporaryDashboardBanner.defaultProps = {
  enabledApplicationModes: [],
  hasLinkedinProfiles: false,
};

export default TemporaryDashboardBanner;
