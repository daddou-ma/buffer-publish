import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { Button, SidebarListItem, Tooltip } from '@bufferapp/ui';
import { offWhite, mystic } from '@bufferapp/components/style/color';
import { borderWidth } from '@bufferapp/components/style/border';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { getURL } from '@bufferapp/publish-server/formatters/src';

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

const getEnabledProfiles = profiles =>
  profiles.filter(profile => !profile.disabled);

const ProfileSidebar = ({
  loading,
  selectedProfileId,
  profiles,
  onProfileClick,
  onManageSocialAccountClick,
  profileLimit,
  showSwitchPlanModal,
  goToConnectSocialAccount,
  onSearchProfileChange,
  isSearchPopupVisible,
  // Flags for showing connection shortcut buttons
  canManageSocialAccounts,
  ownerEmail,
  hasInstagram,
  hasFacebook,
  hasTwitter,
  hasCampaignsFlip,
  onCampaignsButtonClick,
  isCampaignsSelected,
  showUpgradeToProCta,
}) => {
  const { t } = useTranslation();
  const enabledProfiles = getEnabledProfiles(profiles);

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
      {enabledProfiles.length > 0 && (
        <ProfileListStyle data-hide-scrollbar>
          {hasCampaignsFlip && (
            <>
              <ButtonWrapper>
                <SidebarListItem
                  id="campaigns"
                  title={t('campaigns.common.title')}
                  onItemClick={onCampaignsButtonClick}
                  selected={isCampaignsSelected}
                />
              </ButtonWrapper>
              <ProfileListTitle>
                {t('profile-sidebar.socialAccounts')}
              </ProfileListTitle>
              <Divider marginTop="0" marginBottom="1rem" />
            </>
          )}
          {enabledProfiles.length > 9 && (
            <ProfileSearch
              profiles={enabledProfiles}
              onSearchProfileChange={onSearchProfileChange}
              isSearchPopupVisible={isSearchPopupVisible}
              handleSubmit={({ selectedProfile }) =>
                onProfileClick(selectedProfile)
              }
            />
          )}
          <ProfileList
            selectedProfileId={selectedProfileId}
            profiles={enabledProfiles}
            onProfileClick={onProfileClick}
            profileLimit={profileLimit}
          />
        </ProfileListStyle>
      )}
      <ManageSocialAccountsStyle>
        <SocialButtonsWrapperStyle>
          {canManageSocialAccounts && (
            <>
              {!hasInstagram && (
                <ProfileConnectShortcut
                  label={t('profile-sidebar.connectInstagram')}
                  network="instagram"
                  url={`https://${getURL.getBaseURL()}/oauth/instagram/choose_business?cta=publish-app-sidebar-addProfile-1`}
                  profileLimit={profileLimit}
                  profiles={profiles}
                  showSwitchPlanModal={showSwitchPlanModal}
                  goToConnectSocialAccount={goToConnectSocialAccount}
                  showUpgradeToProCta={showUpgradeToProCta}
                />
              )}
              {!hasFacebook && (
                <ProfileConnectShortcut
                  label={t('profile-sidebar.connectFacebook')}
                  network="facebook"
                  url={`https://${getURL.getBaseURL()}/oauth/facebook/choose?cta=publish-app-sidebar-addProfile-1`}
                  profileLimit={profileLimit}
                  profiles={profiles}
                  showSwitchPlanModal={showSwitchPlanModal}
                  goToConnectSocialAccount={goToConnectSocialAccount}
                  showUpgradeToProCta={showUpgradeToProCta}
                />
              )}
              {!hasTwitter && (
                <ProfileConnectShortcut
                  label={t('profile-sidebar.connectTwitter')}
                  network="twitter"
                  url={`https://${getURL.getBaseURL()}/oauth/twitter?cta=publish-app-sidebar-addProfile-1`}
                  profileLimit={profileLimit}
                  profiles={profiles}
                  showSwitchPlanModal={showSwitchPlanModal}
                  goToConnectSocialAccount={goToConnectSocialAccount}
                  showUpgradeToProCta={showUpgradeToProCta}
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
                  onManageSocialAccountClick();
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
  onManageSocialAccountClick: PropTypes.func.isRequired,
  goToConnectSocialAccount: PropTypes.func.isRequired,
  showSwitchPlanModal: PropTypes.func,
  selectedProfileId: ProfileList.propTypes.selectedProfileId,
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfileListItem.propTypes)),
  profileLimit: PropTypes.number,
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
  showUpgradeToProCta: PropTypes.bool,
};

ProfileSidebar.defaultProps = {
  onProfileClick: ProfileList.defaultProps.onProfileClick,
  selectedProfileId: ProfileList.defaultProps.selectedProfileId,
  profiles: [],
  onSearchProfileChange: PropTypes.func,
  isSearchPopupVisible: false,
  showSwitchPlanModal: () => {},
  onCampaignsButtonClick: () => {},
  profileLimit: 0,
  canManageSocialAccounts: true,
  hasCampaignsFlip: false,
  isCampaignsSelected: false,
  ownerEmail: 'the owner',
  showUpgradeToProCta: true,
};

export default ProfileSidebar;
