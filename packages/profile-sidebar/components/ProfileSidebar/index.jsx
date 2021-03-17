import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Button, SidebarListItem, Tooltip } from '@bufferapp/ui';
import { offWhite, mystic } from '@bufferapp/components/style/color';
import { borderWidth } from '@bufferapp/components/style/border';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { NavTag } from '@bufferapp/publish-shared-components';

import LoadingProfileListItem from '../LoadingProfileListItem';
import ProfileListItem from '../ProfileListItem';
import ProfileList from '../ProfileList';
import ProfileConnectShortcut from '../ProfileConnectShortcut';
import ProfileSearch from '../ProfileSearch';
import AddChannelButton from '../AddChannelButton';

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

const ProfileListTitle = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  font-weight: 500;
  color: #3d3d3d;
  font-size: 14px;
  line-height: 16px;
  padding-left: 8px;
`;

const ButtonWrapper = styled.div`
  margin-bottom: 1.5rem;
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
  onProfileClick,
  onDropProfile,
  profileLimit,
  onSearchProfileChange,
  isSearchPopupVisible,
  // Flags for showing connection shortcut buttons
  canManageSocialAccounts,
  reachedChannelLimit,
  onAddChannelUpgradeClick,
  ownerEmail,
  hasInstagram,
  hasFacebook,
  hasTwitter,
  hasCampaignsFlip,
  onCampaignsButtonClick,
  isCampaignsSelected,
  manageChannelsURL,
  connectDirectURLs,
  shouldHideLockedChannels,
}) => {
  const { t } = useTranslation();

  const ManageAccountsWrapper = ({ children }) =>
    canManageSocialAccounts ? (
      <>{children}</>
    ) : (
      <Tooltip
        label={t('profile-sidebar.permissionSubtitle', {
          email: ownerEmail,
        })}
        position="top"
      >
        {children}
      </Tooltip>
    );

  return (
    <ProfileSidebarStyle>
      {loading && renderLoadingProfiles()}
      {profiles.length > 0 && (
        <ProfileListStyle data-hide-scrollbar>
          <>
            <ButtonWrapper>
              <SidebarListItem
                id="campaigns"
                title={t('campaigns.common.title')}
                onItemClick={onCampaignsButtonClick}
                selected={isCampaignsSelected}
                badges={hasCampaignsFlip ? null : <NavTag type="paywall" />}
              />
            </ButtonWrapper>
            <ProfileListTitle>
              {t('profile-sidebar.socialAccounts')}
            </ProfileListTitle>
            <Divider marginTop="0" marginBottom="1rem" />
          </>

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
            shouldHideLockedChannels={shouldHideLockedChannels}
          />
        </ProfileListStyle>
      )}
      <ManageSocialAccountsStyle>
        <SocialButtonsWrapperStyle>
          {canManageSocialAccounts && (
            <>
              {reachedChannelLimit && (
                <AddChannelButton
                  onAddChannelUpgradeClick={onAddChannelUpgradeClick}
                />
              )}
              {!hasInstagram && !reachedChannelLimit && (
                <ProfileConnectShortcut
                  label={t('profile-sidebar.connectInstagram')}
                  network="instagram"
                  url={connectDirectURLs.instagram}
                />
              )}
              {!hasFacebook && !reachedChannelLimit && (
                <ProfileConnectShortcut
                  label={t('profile-sidebar.connectFacebook')}
                  network="facebook"
                  url={connectDirectURLs.facebook}
                />
              )}
              {!hasTwitter && !reachedChannelLimit && (
                <ProfileConnectShortcut
                  label={t('profile-sidebar.connectTwitter')}
                  network="twitter"
                  url={connectDirectURLs.twitter}
                />
              )}
            </>
          )}
          <BottomSectionStyle>
            <ButtonDividerStyle>
              <Divider marginTop="1rem" />
            </ButtonDividerStyle>
            <ManageAccountsWrapper>
              <Button
                label={t('profile-sidebar.connectButton')}
                type="secondary"
                fullWidth
                disabled={!canManageSocialAccounts}
                onClick={() => {
                  window.location.assign(manageChannelsURL);
                }}
              />
            </ManageAccountsWrapper>
          </BottomSectionStyle>
        </SocialButtonsWrapperStyle>
      </ManageSocialAccountsStyle>
    </ProfileSidebarStyle>
  );
};

ProfileSidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  onProfileClick: ProfileList.propTypes.onProfileClick,
  manageChannelsURL: PropTypes.string.isRequired,
  connectDirectURLs: PropTypes.shape({
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    twitter: PropTypes.string,
  }).isRequired,
  selectedProfileId: ProfileList.propTypes.selectedProfileId,
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfileListItem.propTypes)),
  profileLimit: PropTypes.number,
  onDropProfile: PropTypes.func,
  hasInstagram: PropTypes.bool.isRequired,
  hasFacebook: PropTypes.bool.isRequired,
  hasTwitter: PropTypes.bool.isRequired,
  onSearchProfileChange: () => {},
  canManageSocialAccounts: PropTypes.bool,
  isSearchPopupVisible: PropTypes.bool,
  hasCampaignsFlip: PropTypes.bool,
  isCampaignsSelected: PropTypes.bool,
  onCampaignsButtonClick: PropTypes.func,
  ownerEmail: PropTypes.string,
  onAddChannelUpgradeClick: PropTypes.func.isRequired,
  reachedChannelLimit: PropTypes.bool,
};

ProfileSidebar.defaultProps = {
  onProfileClick: ProfileList.defaultProps.onProfileClick,
  selectedProfileId: ProfileList.defaultProps.selectedProfileId,
  profiles: [],
  onSearchProfileChange: PropTypes.func,
  isSearchPopupVisible: false,
  onDropProfile: () => {},
  onCampaignsButtonClick: () => {},
  profileLimit: 0,
  canManageSocialAccounts: true,
  hasCampaignsFlip: false,
  isCampaignsSelected: false,
  ownerEmail: 'the owner',
  reachedChannelLimit: false,
};

export default ProfileSidebar;
