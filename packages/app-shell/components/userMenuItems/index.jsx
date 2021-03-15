import React from 'react';
import { Gear, Flash, People, Channels } from '@bufferapp/ui/Icon';
import { gray, purpleLighter, purple } from '@bufferapp/ui/style/colors';
import { getURL } from '@bufferapp/publish-server/formatters';

function generateUserMenuItems({
  manageChannelsURL,
  showPlans,
  openPreferences,
  shouldShowUpgradeButton,
  t,
}) {
  return [
    {
      id: 'preferences',
      title: t('app-shell.preferences'),
      icon: <Gear color={gray} />,
      onItemClick: openPreferences,
    },
    {
      id: 'channels',
      title: t('app-shell.channels'),
      icon: <Channels color={gray} />,
      onItemClick: () => {
        window.location.assign(manageChannelsURL);
      },
    },
    {
      id: 'openTeam',
      title: t('app-shell.team'),
      icon: <People color={gray} />,
      onItemClick: () => {
        window.location.assign(`${getURL.getManageTeamURL()}`);
      },
    },
    shouldShowUpgradeButton && {
      id: 'upgrade',
      /** @todo use purpleDarker when in ui */
      colors: { title: purple, iconHover: purple },
      title: t('app-shell.upgrade'),
      icon: <Flash color={purpleLighter} />,
      hasDivider: true,
      onItemClick: showPlans,
    },
  ].filter(Boolean);
}

export default generateUserMenuItems;
