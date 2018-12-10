import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@bufferapp/components';
import { ProfileBadge } from '@bufferapp/analyze-shared-components';

const profileHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
};

const profileBadgeStyle = {
  padding: '0 0.25rem',
};

const ProfileHeader = ({ profile }) => {
  if (!profile) return null;

  return (
    <div style={profileHeaderStyle}>
      <div style={profileBadgeStyle}>
        <ProfileBadge
          avatarUrl={profile.avatarUrl}
          service={profile.service}
          avatarSize={30}
          socialIconSize={15}
        />
      </div>
      <Text color="outerSpace" size="small" weight="medium">{profile.username}</Text>
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
