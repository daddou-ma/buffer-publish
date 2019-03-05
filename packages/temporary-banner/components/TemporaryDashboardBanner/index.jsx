import React from 'react';
import PropTypes from 'prop-types';

import { Button, Text } from '@bufferapp/components';
import { CloseIcon } from '@bufferapp/components/Icon/Icons';

const textColor = '#662D12';
const dashboardBanner = 'temporary-dashboard-banner';

const getContainerStyle = hidden => ({
  alignItems: 'center',
  backgroundColor: 'rgba(255, 198, 171, 0.75)',
  color: textColor,
  display: hidden ? 'none' : 'flex',
  lineHeight: '22px',
  padding: '16px',
  position: 'relative',
  textAlign: 'left',
  zIndex: 10,
});

const closeIconContainerStyle = {
  height: '16px',
  marginLeft: '16px',
  marginRight: '-16px',
  padding: '16px',
  width: '16px',
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
    const { hidden } = this.state;
    const { enabledApplicationModes } = this.props;

    if (!enabledApplicationModes) {
      return null;
    }

    const temporaryDashboard =
      this.getEnabledApplicationMode(dashboardBanner, enabledApplicationModes);

    if (!temporaryDashboard) {
      return null;
    }

    return (
      <div style={getContainerStyle(hidden)}>
        <div>
          <Text color={textColor} size="mini">
            <div dangerouslySetInnerHTML={{ __html: temporaryDashboard.content }} />
          </Text>
        </div>
        <div style={closeIconContainerStyle}>
          <Button
            borderless
            noStyle
            onClick={() => {
              this.setState({ hidden: true });
            }}
          >
            <CloseIcon color={textColor} />
          </Button>
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
