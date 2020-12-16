import React from 'react';
import PropTypes from 'prop-types';
import BDSAppShell from '@bufferapp/app-shell';
import { useTranslation } from 'react-i18next';
import generateOrgSwitcherItems from '../orgSwitcherItems';
import generateUserMenuItems from '../userMenuItems';
import helpMenuItems from '../helpMenuItems';

const AppShell = ({
  children,
  showSwitchPlan,
  showManageTeam,
  returnToClassic,
  switchPlan,
  openPreferences,
  bannerOptions,
  onCloseBanner,
  bannerKey,
  hideAppShell,
  canSeeOrgSwitcher,
  organizations,
  selectedOrganizationId,
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
      user={generateUserMenuItems({
        showSwitchPlan,
        showManageTeam,
        returnToClassic,
        switchPlan,
        openPreferences,
        t,
      })}
      helpMenuItems={helpMenuItems(t)}
      orgSwitcher={generateOrgSwitcherItems({
        canSeeOrgSwitcher,
        organizations,
        selectedOrganizationId,
        profiles,
        switchOrganization,
      })}
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
  showSwitchPlan: PropTypes.bool,
  showManageTeam: PropTypes.bool,
  returnToClassic: PropTypes.func.isRequired,
  switchPlan: PropTypes.func.isRequired,
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
  canSeeOrgSwitcher: PropTypes.bool,
  organizations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      locked: PropTypes.bool,
      name: PropTypes.string,
      ownerId: PropTypes.string,
      ownerEmail: PropTypes.string,
      planCode: PropTypes.number,
      isAdmin: PropTypes.bool,
    })
  ).isRequired,
  selectedOrganizationId: PropTypes.string,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  switchOrganization: PropTypes.func.isRequired,
};

AppShell.defaultProps = {
  canSeeOrgSwitcher: false,
  showSwitchPlan: false,
  showManageTeam: false,
  bannerOptions: null,
  bannerKey: null,
  selectedOrganizationId: null,
};

export default AppShell;
