import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/components';
import Avatar from '@bufferapp/ui/Avatar';

const profileHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
};

const profileBadgeStyle = {
  padding: '0 0.25rem',
  marginRight: '0.7rem',
};

const ProfileHeader = ({ profile }) => {
  if (!profile) return null;

  return (
    <div style={profileHeaderStyle}>
      <div style={profileBadgeStyle}>
        <Avatar
          src={profile.avatar_https}
          fallbackUrl="https://s3.amazonaws.com/buffer-ui/Default+Avatar.png"
          alt={profile.handle}
          size="small"
          type="social"
          network={profile.service}
        />
      </div>
      <Text color="outerSpace" size="small">
        {profile.username}
      </Text>
    </div>
  );
};

ProfileHeader.propTypes = {
  profile: PropTypes.shape({
    service: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }),
};

ProfileHeader.defaultProps = {
  profile: null,
};

export default ProfileHeader;
