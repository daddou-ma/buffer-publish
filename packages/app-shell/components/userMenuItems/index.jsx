import React from 'react';
import { Gear, Return, Plus, People } from '@bufferapp/ui/Icon';
import { gray } from '@bufferapp/ui/style/colors';
import { getURL } from '@bufferapp/publish-server/formatters/src';

const InvertedReturnIcon = () => (
  <span style={{ transform: 'scaleX(-1)', height: '16px' }}>
    <Return color={gray} />
  </span>
);

function generateUserMenuItems({
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
  if (showSwitchPlan) {
    extraItems.push(userMenuItems.switchPlan);
  }
  return [...userMenuItems.top, ...extraItems];
}

export default generateUserMenuItems;
