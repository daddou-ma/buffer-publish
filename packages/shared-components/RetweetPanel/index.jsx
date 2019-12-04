import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text } from '@bufferapp/components';

const retweetPanelContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const retweetHandleContainer = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem',
};

const RetweetPanel = ({ name, handle, avatarUrl }) => (
  <div style={retweetPanelContainerStyle}>
    <Image
      src={avatarUrl}
      border={'circle'}
      height={'2.25rem'}
      width={'2.25rem'}
    />
    <div style={retweetHandleContainer}>
      <Text size={'mini'}>{name}</Text>
      <Text size={'small'}>{handle}</Text>
    </div>
  </div>
);

RetweetPanel.propTypes = {
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default RetweetPanel;
