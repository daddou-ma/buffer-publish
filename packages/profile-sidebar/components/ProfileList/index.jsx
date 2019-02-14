import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Divider,
} from '@bufferapp/components';
import ProfileListItem from '../ProfileListItem';
import ProfileDragWrapper from '../ProfileDragWrapper';
import ProfileLockedHeader from '../ProfileLockedHeader';

const ProfileList = ({
  profiles,
  selectedProfileId,
  onProfileClick,
  onDropProfile,
  showProfilesDisconnectedModal,
  profileLimit,
  translations,
}) => {
  const lockedProfiles = profiles.length > profileLimit;
  return (
    <List
      items={profiles.map((profile, index) =>
        <div>
          {lockedProfiles && (index === profileLimit) &&
            <div>
              <ProfileLockedHeader
                translations={translations}
                profileLimit={profileLimit}
              />
              <Divider />
            </div>
          }
          <ProfileDragWrapper
            avatarUrl={profile.avatarUrl}
            type={profile.type}
            handle={profile.handle}
            notifications={profile.pendingCount}
            selected={profile.id === selectedProfileId}
            locked={profile.disabled}
            disconnected={profile.isDisconnected}
            onClick={() => onProfileClick(profile)}
            profileLimit={profileLimit}
            onDropProfile={onDropProfile}
            showProfilesDisconnectedModal={showProfilesDisconnectedModal}
            id={profile.id}
            index={index}
          />
        </div>,
      )}
    />
  );
};

ProfileList.propTypes = {
  onProfileClick: PropTypes.func.isRequired,
  onDropProfile: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape(ProfileListItem.propTypes),
  ),
  selectedProfileId: PropTypes.string,
  showProfilesDisconnectedModal: PropTypes.func.isRequired,
  profileLimit: PropTypes.number.isRequired,
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
    lockedList: PropTypes.string,
    lockedListTooltip: PropTypes.string,
  }).isRequired,
};

ProfileList.defaultProps = {
  profiles: [],
  selectedProfileId: undefined,
};

export default ProfileList;
