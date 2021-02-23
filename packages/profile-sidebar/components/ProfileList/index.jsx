import React from 'react';
import PropTypes from 'prop-types';
import ProfileListItem from '../ProfileListItem';
import ProfileDragWrapper from '../ProfileDragWrapper';

const ProfileWrapper = ({ shouldHideLockedChannels, ...props }) =>
  shouldHideLockedChannels ? (
    <ProfileListItem {...props} />
  ) : (
    <ProfileDragWrapper {...props} />
  );

const ProfileList = ({
  profiles,
  selectedProfileId,
  onProfileClick,
  onDropProfile,
  profileLimit,
  shouldHideLockedChannels,
}) =>
  profiles.map((profile, index) => (
    <ProfileWrapper
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
      key={profile.id}
      location={profile.location}
      shouldHideLockedChannels={shouldHideLockedChannels}
    />
  ));

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
