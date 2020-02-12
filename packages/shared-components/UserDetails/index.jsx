import React from 'react';
import PropTypes from 'prop-types';
import { Image, Text } from '@bufferapp/components';

const UserDetailsContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const retweetHandleContainer = {
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem',
};

const UserDetails = ({ name, handle, avatarUrl }) => (
  <div style={UserDetailsContainerStyle}>
    <Image src={avatarUrl} border="circle" height="2.25rem" width="2.25rem" />
    <div style={retweetHandleContainer}>
      <Text size="mini">{name}</Text>
      <Text size="small">{handle}</Text>
    </div>
  </div>
);

UserDetails.propTypes = {
  name: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string.isRequired,
};

export default UserDetails;
