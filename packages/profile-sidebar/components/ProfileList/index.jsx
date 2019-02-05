import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
} from '@bufferapp/components';
import ProfileListItem from '../ProfileListItem';

const ProfileList = ({
  profiles,
  selectedProfileId,
  onProfileClick,
}) =>
  <List
    items={profiles.map(profile =>
      <ProfileListItem
        avatarUrl={profile.avatarUrl}
        type={profile.type}
        handle={profile.handle}
        notifications={profile.pendingCount}
        selected={profile.id === selectedProfileId}
        locked={profile.disabled}
        onClick={() => onProfileClick(profile)}
      />,
    )}
  />;

ProfileList.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape(ProfileListItem.propTypes),
  ),
  selectedProfileId: PropTypes.string,
};

ProfileList.defaultProps = {
  profiles: [],
  selectedProfileId: undefined,
};

export default ProfileList;
