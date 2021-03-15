import React from 'react';
import PropTypes from 'prop-types';
import BDSAppShell from '@bufferapp/app-shell';
import { useTranslation } from 'react-i18next';
import generateUserMenuItems from '../userMenuItems';
import helpMenuItems from '../helpMenuItems';

const AppShell = ({
  children,
  manageChannelsURL,
  showPlans,
  shouldShowUpgradeButton,
  openPreferences,
  bannerOptions,
  onCloseBanner,
  bannerKey,
  hideAppShell,
  profiles,
  switchOrganization,
}) => {
  if (hideAppShell) {
    return children;
  }

  const { t } = useTranslation();

  return (
    <BDSAppShell
      displaySkipLink
      content={children}
      activeProduct="publish"
      menuItems={generateUserMenuItems({
        manageChannelsURL,
        showPlans,
        openPreferences,
        shouldShowUpgradeButton,
        t,
      })}
      helpMenuItems={helpMenuItems(t)}
      channels={profiles.map(profile => ({
        id: profile.id,
        name: profile.formatted_username,
        organizationId: profile.organizationId,
        service: profile.service,
      }))}
      onOrganizationSelected={switchOrganization}
      bannerOptions={
        bannerOptions
          ? {
              ...bannerOptions,
              onCloseBanner: () => onCloseBanner({ key: bannerKey }),
            }
          : null
      }
    />
  );
};

AppShell.propTypes = {
  children: PropTypes.node.isRequired,
  showPlans: PropTypes.func.isRequired,
  manageChannelsURL: PropTypes.string.isRequired,
  shouldShowUpgradeButton: PropTypes.bool,
  openPreferences: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  bannerKey: PropTypes.string,
  onCloseBanner: PropTypes.func.isRequired,
  bannerOptions: PropTypes.shape({
    themeColor: PropTypes.string,
    customHTML: PropTypes.shape({
      __html: PropTypes.string,
    }),
  }),
  hideAppShell: PropTypes.bool.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  switchOrganization: PropTypes.func.isRequired,
};

AppShell.defaultProps = {
  shouldShowUpgradeButton: true,
  bannerOptions: null,
  bannerKey: null,
};

export default AppShell;
