import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import { offWhite, mystic } from '@bufferapp/components/style/color';
import { blue } from '@bufferapp/ui/style/colors';
import { borderWidth } from '@bufferapp/components/style/border';
import styled from 'styled-components';

import LoadingProfileListItem from '../LoadingProfileListItem';
import ProfileListItem from '../ProfileListItem';
import ProfileList from '../ProfileList';
import ProfileConnectShortcut from '../ProfileConnectShortcut';
import ProfileSearch from '../ProfileSearch';

const ProfileSidebarStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  background: ${offWhite};
  border-right: ${borderWidth} solid ${mystic};
  height: 100%;
  justify-content: flex-start;
`;

const ProfileListStyle = styled.div`
  overflow-y: scroll;
`;

const ManageSocialAccountsStyle = styled.div`
  display: flex;
  flex-grow: 1;
  flex-shrink: 0;
  flex-flow: column nowrap;
  position: sticky;
  bottom: 15px;
  background-color: #fcfcfc;
`;

const SocialButtonsWrapperStyle = styled.div`
  display: flex;
  flex: 1;
  flex-flow: column nowrap;
  margin-top: auto;
`;

const ButtonDividerStyle = styled.div`
  margin-bottom: 0.5rem;
`;

const BottomSectionStyle = styled.div`
  margin-top: auto;
  display: flex;
  flex-flow: column nowrap;
`;

const ProfileListTitleStyle = styled.div`
  font-weight: bold;
  color: #3d3d3d;
  font-size: 14px;
  line-height: 16px;
`;

const CampaignButton = styled.div`
  background-color: transparent;
  color: #3d3d3d;
  display: flex;
  align-items: center;
  font-weight: bold;
  border-radius: 4px;
  font-size: 14px;
  line-height: 16px;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0px; // 8px
  padding-right: 8px;
  margin-bottom: 1rem;
  height: 32px;
  cursor: pointer;
  :hover {
    background-color: ${blue};
    color: #ffffff;
    padding-left: 8px;
  }
`;

const Wrapper = styled.div``;

const renderLoadingProfiles = () => (
  <Wrapper>
    <LoadingProfileListItem />
    <LoadingProfileListItem offset="100ms" />
    <LoadingProfileListItem offset="200ms" />
    <LoadingProfileListItem offset="300ms" />
    <LoadingProfileListItem offset="400ms" />
  </Wrapper>
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
  hasCampaignsFlip,
}) => (
  <ProfileSidebarStyle>
    {loading && renderLoadingProfiles()}
    {profiles.length > 0 && (
      <ProfileListStyle data-hide-scrollbar>
        {hasCampaignsFlip && (
          <CampaignButton onClick={() => {}}>Campaigns</CampaignButton>
        )}
        <ProfileListTitleStyle>Social accounts</ProfileListTitleStyle>
        <ButtonDividerStyle>
          <Divider marginTop="8px" />
        </ButtonDividerStyle>
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
      </ProfileListStyle>
    )}
    <ManageSocialAccountsStyle>
      <SocialButtonsWrapperStyle>
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
        <BottomSectionStyle>
          <ButtonDividerStyle>
            <Divider marginTop="1rem" />
          </ButtonDividerStyle>
          <Button
            label={translations.connectButton}
            type="secondary"
            fullWidth
            onClick={() => {
              onManageSocialAccountClick();
            }}
          />
        </BottomSectionStyle>
      </SocialButtonsWrapperStyle>
    </ManageSocialAccountsStyle>
  </ProfileSidebarStyle>
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
  hasCampaignsFlip: PropTypes.bool,
};

ProfileSidebar.defaultProps = {
  onProfileClick: ProfileList.defaultProps.onProfileClick,
  selectedProfileId: ProfileList.defaultProps.selectedProfileId,
  profiles: [],
  onSearchProfileChange: PropTypes.func,
  isSearchPopupVisible: false,
  translations: {},
  showSwitchPlanModal: () => {},
  onDropProfile: () => {},
  profileLimit: 0,
  hasCampaignsFlip: false,
};

export default ProfileSidebar;
