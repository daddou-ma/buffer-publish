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
  flexGrow: 1,
  flexShrink: 0,
  flexFlow: 'column nowrap',
  position: 'sticky',
  bottom: '15px',
  backgroundColor: '#fcfcfc',
};

const socialButtonsWrapperStyle = {
  display: 'flex',
  flex: 1,
  flexFlow: 'column nowrap',
  marginTop: 'auto',
};

const buttonDividerStyle = {
  marginBottom: '0.5rem',
};

const bottomSectionStyle = {
  marginTop: 'auto',
  display: 'flex',
  flexFlow: 'column nowrap',
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
  showSwitchPlanModal,
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
    {profiles.length > 0 && (
      <div style={profileListStyle} data-hide-scrollbar>
        {profiles.length > 9 && (
          <ProfileSearch
            profiles={profiles}
            onSearchProfileChange={onSearchProfileChange}
            isSearchPopupVisible={isSearchPopupVisible}
            handleSubmit={({ selectedProfile }) =>
              onProfileClick(selectedProfile)
            }
          />
        )}
        <ProfileList
          selectedProfileId={selectedProfileId}
          profiles={profiles}
          onProfileClick={onProfileClick}
          onDropProfile={onDropProfile}
          profileLimit={profileLimit}
          translations={translations}
        />
      </div>
    )}
    <div style={manageSocialAccountsStyle}>
      <div style={socialButtonsWrapperStyle}>
        {!hasInstagram && (
          <ProfileConnectShortcut
            label="Connect Instagram"
            network="instagram"
            url="https://buffer.com/oauth/instagram?cta=publish-app-sidebar-addProfile-1"
            profileLimit={profileLimit}
            profiles={profiles}
            showSwitchPlanModal={showSwitchPlanModal}
            goToConnectSocialAccount={goToConnectSocialAccount}
          />
        )}
        {!hasFacebook && (
          <ProfileConnectShortcut
            label="Connect Facebook"
            network="facebook"
            url="https://buffer.com/oauth/facebook/choose?cta=publish-app-sidebar-addProfile-1"
            profileLimit={profileLimit}
            profiles={profiles}
            showSwitchPlanModal={showSwitchPlanModal}
            goToConnectSocialAccount={goToConnectSocialAccount}
          />
        )}
        {!hasTwitter && (
          <ProfileConnectShortcut
            label="Connect Twitter"
            network="twitter"
            url="https://buffer.com/oauth/twitter?cta=publish-app-sidebar-addProfile-1"
            profileLimit={profileLimit}
            profiles={profiles}
            showSwitchPlanModal={showSwitchPlanModal}
            goToConnectSocialAccount={goToConnectSocialAccount}
          />
        )}
        <div style={bottomSectionStyle}>
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
    </div>
  </div>
);

ProfileSidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  onProfileClick: ProfileList.propTypes.onProfileClick,
  onManageSocialAccountClick: PropTypes.func.isRequired,
  goToConnectSocialAccount: PropTypes.func.isRequired,
  showSwitchPlanModal: PropTypes.func,
  selectedProfileId: ProfileList.propTypes.selectedProfileId,
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfileListItem.propTypes)),
  translations: PropTypes.shape({
    connectButton: PropTypes.string,
  }),
  profileLimit: PropTypes.number,
  onDropProfile: PropTypes.func,
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
