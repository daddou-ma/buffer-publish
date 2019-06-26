import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import { offWhite, mystic } from '@bufferapp/components/style/color';
import { borderWidth } from '@bufferapp/components/style/border';

import LoadingProfileListItem from '../LoadingProfileListItem';
import ProfileListItem from '../ProfileListItem';
import ProfileList from '../ProfileList';
import ProfileConnectShortcut from '../ProfileConnectShortcut';
import ProfileSearch from '../ProfileSearch';

const profileSidebarStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  boxSizing: 'border-box',
  background: offWhite,
  borderRight: `${borderWidth} solid ${mystic}`,
  height: '100%',
  justifyContent: 'flex-start',
};

const profileListStyle = {
  overflowY: 'scroll',
};

const manageSocialAccountsStyle = {
  display: 'flex',
  flexFlow: 'column nowrap',
  flex: 1,
  position: 'sticky',
  bottom: '15px',
  backgroundColor: '#fcfcfc',
};

const buttonDividerStyle = {
  marginTop: 'auto',
  marginBottom: '0.5rem',
};

const renderLoadingProfiles = () => (
  <div>
    <LoadingProfileListItem />
    <LoadingProfileListItem offset="100ms" />
    <LoadingProfileListItem offset="200ms" />
    <LoadingProfileListItem offset="300ms" />
    <LoadingProfileListItem offset="400ms" />
  </div>
);

const ProfileSidebar = ({
  loading,
  selectedProfileId,
  profiles,
  translations,
  onProfileClick,
  onDropProfile,
  onManageSocialAccountClick,
  profileLimit,
  showProfilesDisconnectedModal,
  showUpgradeModal,
  goToConnectSocialAccount,
  onSearchProfileChange,
  isSearchPopupVisible,

  // Flags for showing connection shortcut buttons
  hasInstagram,
  hasFacebook,
  hasTwitter,
}) => (
  <div style={profileSidebarStyle}>
    {loading && renderLoadingProfiles()}
    <div style={profileListStyle} data-hide-scrollbar>
      {profiles.length > 9 &&
        <ProfileSearch
          profiles={profiles}
          onSearchProfileChange={onSearchProfileChange}
          isSearchPopupVisible={isSearchPopupVisible}
          handleSubmit={({ selectedProfile }) => onProfileClick(selectedProfile)}
        />
      }
      <ProfileList
        selectedProfileId={selectedProfileId}
        profiles={profiles}
        onProfileClick={onProfileClick}
        onDropProfile={onDropProfile}
        showProfilesDisconnectedModal={showProfilesDisconnectedModal}
        profileLimit={profileLimit}
        translations={translations}
      />
    </div>
    <div style={manageSocialAccountsStyle}>
      {!hasInstagram && <ProfileConnectShortcut
        label="Connect Instagram"
        network="instagram"
        url="https://buffer.com/oauth/instagram"
        profileLimit={profileLimit}
        profiles={profiles}
        showUpgradeModal={showUpgradeModal}
        goToConnectSocialAccount={goToConnectSocialAccount}
      />}
      {!hasFacebook && <ProfileConnectShortcut
        label="Connect Facebook"
        network="facebook"
        url="https://buffer.com/oauth/facebook/choose"
        profileLimit={profileLimit}
        profiles={profiles}
        showUpgradeModal={showUpgradeModal}
        goToConnectSocialAccount={goToConnectSocialAccount}
      />}
      {!hasTwitter && <ProfileConnectShortcut
        label="Connect Twitter"
        network="twitter"
        url="https://buffer.com/oauth/twitter"
        profileLimit={profileLimit}
        profiles={profiles}
        showUpgradeModal={showUpgradeModal}
        goToConnectSocialAccount={goToConnectSocialAccount}
      />}
      <div style={buttonDividerStyle}>
        <Divider marginTop="1rem" />
      </div>
      <Button
        label={translations.connectButton}
        type="secondary"
        fullWidth
        onClick={() => {
          onManageSocialAccountClick();
        }}
      />
    </div>
  </div>
);

ProfileSidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  onProfileClick: ProfileList.propTypes.onProfileClick,
  onManageSocialAccountClick: PropTypes.func.isRequired,
  goToConnectSocialAccount: PropTypes.func.isRequired,
  showUpgradeModal: PropTypes.func.isRequired,
  selectedProfileId: ProfileList.propTypes.selectedProfileId,
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfileListItem.propTypes)),
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
  }),
  profileLimit: PropTypes.number,
  onDropProfile: PropTypes.func,
  showProfilesDisconnectedModal: PropTypes.func.isRequired,
  hasInstagram: PropTypes.bool.isRequired,
  hasFacebook: PropTypes.bool.isRequired,
  hasTwitter: PropTypes.bool.isRequired,
  onSearchProfileChange: () => {},
  isSearchPopupVisible: PropTypes.bool,
};

ProfileSidebar.defaultProps = {
  onProfileClick: ProfileList.defaultProps.onProfileClick,
  selectedProfileId: ProfileList.defaultProps.selectedProfileId,
  profiles: [],
  onSearchProfileChange: PropTypes.func,
  isSearchPopupVisible: false,
};

export default ProfileSidebar;
