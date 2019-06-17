import React from 'react';
import PropTypes from 'prop-types';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { AppShell as BDSAppShell } from '@bufferapp/ui';
import { Gear, Return, Plus, People } from '@bufferapp/ui/Icon';
import { gray } from '@bufferapp/ui/style/colors';

const InvertedReturnIcon = () => (
  <span style={{ transform: 'scaleX(-1)', height: '16px' }}>
    <Return color={gray} />
  </span>
);

const helpMenuItems = [
  {
    id: '1',
    title: 'Support',
    onItemClick: () => {
      window.location.assign(`https://${getURL.getBaseURL()}/support`);
    },
  },
  {
    id: '1',
    title: 'FAQ',
    onItemClick: () => {
      window.location.assign('https://faq.buffer.com/');
    },
  },
  {
    id: '2',
    title: 'Status',
    onItemClick: () => {
      window.location.assign('https://status.buffer.com/');
    },
  },
  {
    id: '3',
    title: 'Pricing & Plans',
    onItemClick: () => {
      window.location.assign(`https://${getURL.getBaseURL()}/pricing`);
    },
  },
  {
    id: '4',
    title: 'Wishlist',
    onItemClick: () => {
      window.location.assign('https://buffersurvey.typeform.com/to/ZEiVmL');
    },
  },
];

function generateUserMenuItems({
  showReturnToClassic,
  showUpgradeToPro,
  showStartProTrial,
  returnToClassic,
  upgradeToPro,
  openPreferences,
  showManageTeam,
}) {
  const userMenuItems = {
    top: [
      {
        id: 'preferences',
        title: 'Preferences',
        icon: <Gear color={gray} />,
        onItemClick: openPreferences,
      },
    ],
    manageTeam: {
      id: 'openTeam',
      title: 'Team',
      icon: <People color={gray} />,
      onItemClick: () => {
        window.location.assign(`${getURL.getManageTeamURL()}`);
      },
    },
    returnToClassic: {
      id: 'returnToClassic',
      title: 'Return to Classic',
      icon: <InvertedReturnIcon />,
      hasDivider: true,
      onItemClick: returnToClassic,
    },
    startProTrial: {
      id: 'startProTrial',
      title: 'Start Pro Trial',
      icon: <Plus color={gray} />,
      onItemClick: () => {
        window.location.assign(`${getURL.getStartTrialURL('pro')}`);
      },
    },
    upgradeToPro: {
      id: 'upgradeToPro',
      title: 'Upgrade to Pro',
      icon: <Plus color={gray} />,
      onItemClick: upgradeToPro,
    },
  };
  const extraItems = [];
  if (showManageTeam) {
    extraItems.push(userMenuItems.manageTeam);
  }
  if (showReturnToClassic) {
    extraItems.push(userMenuItems.returnToClassic);
  }
  if (showUpgradeToPro) {
    if (showStartProTrial) {
      extraItems.push(userMenuItems.startProTrial);
    } else {
      extraItems.push(userMenuItems.upgradeToPro);
    }
  }
  return [...userMenuItems.top, ...extraItems];
}

const AppShell = ({
  children,
  user,
  showReturnToClassic,
  showUpgradeToPro,
  showManageTeam,
  showStartProTrial,
  returnToClassic,
  upgradeToPro,
  openPreferences,
}) => (
  <BDSAppShell
    content={children}
    activeProduct="publish"
    user={{
      ...user,
      menuItems: generateUserMenuItems({
        showReturnToClassic,
        showUpgradeToPro,
        showManageTeam,
        showStartProTrial,
        returnToClassic,
        upgradeToPro,
        openPreferences,
      }),
    }}
    helpMenuItems={helpMenuItems}
  />
);

AppShell.propTypes = {
  children: PropTypes.node.isRequired,
  showReturnToClassic: PropTypes.bool,
  showUpgradeToPro: PropTypes.bool,
  showManageTeam: PropTypes.bool,
  showStartProTrial: PropTypes.bool,
  returnToClassic: PropTypes.func.isRequired,
  upgradeToPro: PropTypes.func.isRequired,
  openPreferences: PropTypes.func.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

AppShell.defaultProps = {
  user: {
    name: '...',
    email: null,
    avatar: null,
  },
  showReturnToClassic: false,
  showUpgradeToPro: false,
  showManageTeam: false,
};

export default AppShell;
