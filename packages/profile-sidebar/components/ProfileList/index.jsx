import React from 'react';
import PropTypes from 'prop-types';
import ProfileListItem from '../ProfileListItem';

const ProfileList = ({ profiles, selectedProfileId, onProfileClick }) =>
  profiles.map((profile, index) => (
    <ProfileListItem
      avatarUrl={profile.avatarUrl}
      type={profile.type}
      handle={profile.handle}
      pendingCount={profile.pendingCount}
      selected={profile.id === selectedProfileId}
      disconnected={profile.isDisconnected}
      onClick={() => onProfileClick(profile)}
      id={profile.id}
      index={index}
      key={profile.id}
      location={profile.location}
    />
  ));

ProfileList.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfileListItem.propTypes)),
  selectedProfileId: PropTypes.string,
  profileLimit: PropTypes.number.isRequired,
};

ProfileList.defaultProps = {
  profiles: [],
  selectedProfileId: undefined,
};

export default ProfileList;
