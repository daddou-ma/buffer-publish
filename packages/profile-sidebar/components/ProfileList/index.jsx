import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@bufferapp/components';
import ProfileListItem from '../ProfileListItem';
import ProfileDragWrapper from '../ProfileDragWrapper';

const ProfileList = ({
  profiles,
  selectedProfileId,
  onProfileClick,
  onDropProfile,
  profileLimit,
}) => (
  <List
    items={profiles.map((profile, index) => (
      <ProfileDragWrapper
        avatarUrl={profile.avatarUrl}
        type={profile.type}
        handle={profile.handle}
        pendingCount={profile.pendingCount}
        selected={profile.id === selectedProfileId}
        locked={profile.disabled}
        disconnected={profile.isDisconnected}
        onClick={() => onProfileClick(profile)}
        profileLimit={profileLimit}
        onDropProfile={onDropProfile}
        id={profile.id}
        index={index}
        location={profile.location}
      />
    ))}
  />
);

ProfileList.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  onDropProfile: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfileListItem.propTypes)),
  selectedProfileId: PropTypes.string,
  profileLimit: PropTypes.number.isRequired,
};

ProfileList.defaultProps = {
  profiles: [],
  selectedProfileId: undefined,
};

export default ProfileList;
