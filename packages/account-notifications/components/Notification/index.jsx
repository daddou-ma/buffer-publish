import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '@bufferapp/publish-shared-components';
import {
  Text,
  Toggle,
} from '@bufferapp/components';

const textStyle = {
  marginTop: '0.5rem',
};

const switchStyle = {
  flex: 0.3,
  whiteSpace: 'nowrap',
  marginLeft: '1rem',
  textAlign: 'right',
};

const Notification = ({ title, description, onToggleClick, toggleisEnabled, type }) => (
  <Row>
    <div>
      <Text color={'black'} size={'mini'}>{title}</Text>
      {description &&
        <div style={textStyle}>
          <Text size={'mini'}>{description}</Text>
        </div>
      }
    </div>
    <div style={switchStyle}>
      <Toggle
        onText={'Enabled'}
        offText={'Disabled'}
        on={toggleisEnabled}
        size={'mini'}
        onClick={() => onToggleClick(!toggleisEnabled, type)}
      />
    </div>
  </Row>
);

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onToggleClick: PropTypes.func.isRequired,
  toggleisEnabled: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

Notification.defaultProps = {
  description: null,
};

export default Notification;
