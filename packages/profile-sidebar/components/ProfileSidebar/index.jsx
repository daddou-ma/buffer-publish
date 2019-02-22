import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Button,
  Divider,
} from '@bufferapp/components';
import FeatureLoader from '@bufferapp/product-features';
import { offWhite, mystic } from '@bufferapp/components/style/color';
import { borderWidth } from '@bufferapp/components/style/border';

import LoadingProfileListItem from '../LoadingProfileListItem';
import ProfileListItem from '../ProfileListItem';
import ProfileList from '../ProfileList';
import ProfileConnectShortcut from '../ProfileConnectShortcut';

const profileSidebarStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100%',
  maxHeight: '100%',
  padding: '1rem',
  boxSizing: 'border-box',
  background: offWhite,
  borderRight: `${borderWidth} solid ${mystic}`,
};

const productTitleStyle = {
  marginRight: '0.25rem',
  letterSpacing: '-0.01rem',
};

const profileListStyle = {
  flexGrow: 1,
  overflowY: 'scroll',
};

const buttonDividerStyle = {
  margin: '1rem 0',

};

const productTitle = (
  <div>
    <span style={productTitleStyle}>
      <Text color={'curiousBlue'} weight={'bold'} size={'large'}>
        Publish
      </Text>
    </span>
    <FeatureLoader supportedPlans={'free'}>
      <Text size={'large'}>Free</Text>
    </FeatureLoader>
    <FeatureLoader supportedPlans={'pro'}>
      <Text size={'large'}>Pro</Text>
    </FeatureLoader>
    <FeatureLoader supportedPlans={'business'}>
      <Text size={'large'}>Business</Text>
    </FeatureLoader>
    <Divider marginTop={'1rem'} />
  </div>
);

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
  onConnectSocialAccountClick,
  profileLimit,
  showProfilesDisconnectedModal,

  // Flags for showing connection shortcut buttons
  hasInstagram,
  hasFacebook,
  hasTwitter,
}) => (
  <div style={profileSidebarStyle}>
    {productTitle}
    {loading && renderLoadingProfiles()}
    <div style={profileListStyle} data-hide-scrollbar>
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
    <div>
      {!hasInstagram && <ProfileConnectShortcut
        label="Connect Instagram"
        network="instagram"
        url="https://buffer.com/oauth/instagram"
      />}
      {!hasFacebook && <ProfileConnectShortcut
        label="Connect Facebook"
        network="facebook"
        url="https://buffer.com/oauth/facebook/choose"
      />}
      {!hasTwitter && <ProfileConnectShortcut
        label="Connect Twitter"
        network="twitter"
        url="https://buffer.com/oauth/twitter"
      />}
      <div style={buttonDividerStyle}>
        <Divider />
      </div>
      <Button
        secondary
        fillContainer
        onClick={() => {
          onConnectSocialAccountClick();
        }}
      >
        {translations.connectButton}
      </Button>
    </div>
  </div>
);

ProfileSidebar.propTypes = {
  loading: PropTypes.bool.isRequired,
  onProfileClick: ProfileList.propTypes.onProfileClick,
  onConnectSocialAccountClick: PropTypes.func.isRequired,
  selectedProfileId: ProfileList.propTypes.selectedProfileId,
  profiles: PropTypes.arrayOf(PropTypes.shape(ProfileListItem.propTypes)),
  translations: ProfileList.propTypes.translations,
  profileLimit: PropTypes.number,
  onDropProfile: PropTypes.func,
  showProfilesDisconnectedModal: PropTypes.func.isRequired,
  hasInstagram: PropTypes.bool.isRequired,
  hasFacebook: PropTypes.bool.isRequired,
  hasTwitter: PropTypes.bool.isRequired,
};

ProfileSidebar.defaultProps = {
  onProfileClick: ProfileList.defaultProps.onProfileClick,
  selectedProfileId: ProfileList.defaultProps.selectedProfileId,
  profiles: [],
};

export default ProfileSidebar;
