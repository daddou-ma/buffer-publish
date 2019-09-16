import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import { action } from '@storybook/addon-actions';

import AppShell from './index';

storiesOf('AppShell', module)
  .addDecorator(checkA11y)
  .add('normal', () => (
    <AppShell
      user={{
        name: 'Hamish Macpherson',
        email: 'hamstu@gmail.com',
        avatar:
          'https://pbs.twimg.com/profile_images/847849987841167360/WEVTxvUA_400x400.jpg',
      }}
      returnToClassic={action('return-to-classic')}
      openAccount={action('open-account')}
      openPreferences={action('open-preferences')}
      openLogout={action('open-logout')}
    >
      This is my content
    </AppShell>
  ))
  .add('with return to classic link', () => (
    <AppShell
      showReturnToClassic
      user={{
        name: 'Tom Redman',
        email: 'tom.redman@buffer.com',
        avatar:
          'https://pbs.twimg.com/profile_images/988599738315423745/epPuqmx4_400x400.jpg',
      }}
      returnToClassic={action('return-to-classic')}
      openAccount={action('open-account')}
      openPreferences={action('open-preferences')}
      openLogout={action('open-logout')}
    >
      This is my content
    </AppShell>
  ))
  .add('with start a pro trial link', () => (
    <AppShell
      showStartProTrial
      showSwitchPlan
      user={{
        name: 'Tom Redman',
        email: 'tom.redman@buffer.com',
        avatar:
          'https://pbs.twimg.com/profile_images/988599738315423745/epPuqmx4_400x400.jpg',
      }}
      returnToClassic={action('return-to-classic')}
      openAccount={action('open-account')}
      openPreferences={action('open-preferences')}
      openLogout={action('open-logout')}
    >
      This is my content
    </AppShell>
  ));
