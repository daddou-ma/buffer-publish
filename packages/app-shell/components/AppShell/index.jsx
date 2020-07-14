import React from 'react';
import PropTypes from 'prop-types';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { AppShell as BDSAppShell } from '@bufferapp/ui';
import { Gear, Return, Plus, People } from '@bufferapp/ui/Icon';
import { gray } from '@bufferapp/ui/style/colors';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { useTranslation } from 'react-i18next';

const InvertedReturnIcon = () => (
  <span style={{ transform: 'scaleX(-1)', height: '16px' }}>
    <Return color={gray} />
  </span>
);

const helpMenuItems = t => {
  return [
    {
      id: '1',
      title: t('app-shell.helpCenter'),
      onItemClick: () => {
        window.location.assign('https://support.buffer.com/hc/en-us');
      },
    },
    {
      id: '2',
      title: t('app-shell.status'),
      onItemClick: () => {
        window.location.assign('https://status.buffer.com/');
      },
    },
    {
      id: '3',
      title: t('app-shell.pricingAndPlans'),
      onItemClick: () => {
        window.location.assign(`https://${getURL.getBaseURL()}/pricing`);
      },
    },
    {
      id: '4',
      title: t('app-shell.wishlist'),
      onItemClick: () => {
        window.location.assign('https://buffer.com/feature-request');
      },
    },
  ];
};

function generateUserMenuItems({
  showReturnToClassic,
  showSwitchPlan,
  returnToClassic,
  switchPlan,
  openPreferences,
  showManageTeam,
  t,
}) {
  const userMenuItems = {
    top: [
      {
        id: 'preferences',
        title: t('app-shell.preferences'),
        icon: <Gear color={gray} />,
        onItemClick: openPreferences,
      },
    ],
    manageTeam: {
      id: 'openTeam',
      title: t('app-shell.team'),
      icon: <People color={gray} />,
      onItemClick: () => {
        window.location.assign(`${getURL.getManageTeamURL()}`);
      },
    },
    returnToClassic: {
      id: 'returnToClassic',
      title: t('app-shell.returnToClassic'),
      icon: <InvertedReturnIcon />,
      hasDivider: true,
      onItemClick: returnToClassic,
    },
    startProTrial: {
      id: 'startProTrial',
      title: t('app-shell.startProTrial'),
      icon: <Plus color={gray} />,
      onItemClick: () => {
        window.location.assign(
          `${getURL.getStartTrialURL({
            trialType: 'pro',
            cta: SEGMENT_NAMES.APP_SHELL_PRO_TRIAL,
          })}`
        );
      },
    },
    switchPlan: {
      id: 'switchPlan',
      title: t('app-shell.upgradetoPro'),
      icon: <Plus color={gray} />,
      onItemClick: switchPlan,
    },
  };
  const extraItems = [];
  if (showManageTeam) {
    extraItems.push(userMenuItems.manageTeam);
  }
  if (showReturnToClassic) {
    extraItems.push(userMenuItems.returnToClassic);
  }
  if (showSwitchPlan) {
    extraItems.push(userMenuItems.switchPlan);
  }
  return [...userMenuItems.top, ...extraItems];
}

const generateOrgSwitcherItems = ({
  hasOrgSwitcherFeature,
  organizations,
  selectedOrganizationId,
  profiles,
  switchOrganization,
}) => {
  /**
   * Only show if user has feature and 2+ organizations
   */
  const shouldShow = hasOrgSwitcherFeature && organizations?.length >= 2;
  if (!shouldShow) {
    return null;
  }

  const orgSwitcherItems = {
    title: 'Organizations',
    menuItems: [],
  };

  organizations.forEach(org => {
    orgSwitcherItems.menuItems.push({
      id: org.id,
      title: org.name,
      selected: selectedOrganizationId === org.id,
      onItemClick: () => switchOrganization(org.id),
      subItems: profiles
        .filter(profile => profile.organizationId === org.id)
        .map(profile => ({
          id: profile.id,
          title: profile.formatted_username,
          network: profile.service,
        })),
    });
  });

  return orgSwitcherItems;
};

const AppShell = ({
  children,
  user,
  showReturnToClassic,
  showSwitchPlan,
  showManageTeam,
  showStartProTrial,
  returnToClassic,
  switchPlan,
  openPreferences,
  bannerOptions,
  onCloseBanner,
  bannerKey,
  hideAppShell,
  enabledProducts,
  featureFlips,
  hasOrgSwitcherFeature,
  organizations,
  selectedOrganizationId,
  profiles,
  switchOrganization,
  isImpersonation,
}) => {
  if (hideAppShell) {
    return children;
  }

  const { t } = useTranslation();

  return (
    <BDSAppShell
      displaySkipLink
      content={children}
      enabledProducts={enabledProducts}
      featureFlips={featureFlips}
      activeProduct="publish"
      user={{
        ...user,
        menuItems: generateUserMenuItems({
          showReturnToClassic,
          showSwitchPlan,
          showManageTeam,
          showStartProTrial,
          returnToClassic,
          switchPlan,
          openPreferences,
          t,
        }),
      }}
      helpMenuItems={helpMenuItems(t)}
      orgSwitcher={generateOrgSwitcherItems({
        hasOrgSwitcherFeature,
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
      isImpersonation={isImpersonation}
    />
  );
};

AppShell.propTypes = {
  children: PropTypes.node.isRequired,
  showReturnToClassic: PropTypes.bool,
  showSwitchPlan: PropTypes.bool,
  showManageTeam: PropTypes.bool,
  showStartProTrial: PropTypes.bool,
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
  enabledProducts: PropTypes.arrayOf(PropTypes.string).isRequired,
  featureFlips: PropTypes.arrayOf(PropTypes.string).isRequired,
  hasOrgSwitcherFeature: PropTypes.bool,
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
  selectedOrganizationId: PropTypes.string.isRequired,
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
    })
  ).isRequired,
  switchOrganization: PropTypes.func.isRequired,
  isImpersonation: PropTypes.bool,
};

AppShell.defaultProps = {
  hasOrgSwitcherFeature: false,
  showReturnToClassic: false,
  showSwitchPlan: false,
  showManageTeam: false,
  bannerOptions: null,
  bannerKey: null,
  showStartProTrial: false,
  isImpersonation: false,
};

export default AppShell;
