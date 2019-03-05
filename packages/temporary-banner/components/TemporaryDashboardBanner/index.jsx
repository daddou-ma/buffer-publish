import React from 'react';
import PropTypes from 'prop-types';

import { Button, Text } from '@bufferapp/components';
import { CloseIcon } from '@bufferapp/components/Icon/Icons';

const textColor = '#662D12';
const dashboardBanner = 'temporary-dashboard-banner';

const getContainerStyle = hidden => ({
  backgroundColor: 'rgba(255, 198, 171, 0.75)',
  color: textColor,
  padding: '16px',
  textAlign: 'left',
  lineHeight: '22px',
  display: hidden ? 'none' : '',
});

const closeIconContainerStyle = {
  position: 'absolute',
  top: '19px',
  right: '8px',
};

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
    const { enabledApplicationModes } = this.props;
    const temporaryDashboard =
      this.getEnabledApplicationMode(dashboardBanner, enabledApplicationModes);
    const { hidden } = this.state;

    if (!temporaryDashboard) {
      return null;
    }

    return (
      <div style={getContainerStyle(hidden)}>
        <div style={closeIconContainerStyle}>
          <Button
            borderless
            noStyle
            onClick={() => {
              this.setState({ hidden: true });
            }}
          >
            <CloseIcon />
          </Button>
        </div>
        <div>
          <Text color={textColor} size="mini">
            <div dangerouslySetInnerHTML={{ __html: temporaryDashboard.content }} />
          </Text>
        </div>
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
};

TemporaryDashboardBanner.defaultProps = {
  enabledApplicationModes: [],
};

export default TemporaryDashboardBanner;
