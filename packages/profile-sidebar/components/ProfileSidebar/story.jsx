import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import createStore from '@bufferapp/publish-store';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import ProfileSidebar from './index';
import profiles from '../../mockData/profiles';
import lockedProfiles from '../../mockData/lockedProfiles';

const lotsOfProfiles = () =>
  [...Array(10)].reduce(p => [...p, ...lockedProfiles], []);

const store = createStore();
const translations = {
  connectButton: 'Manage Social Accounts',
  lockedList: 'Locked Social Accounts',
  lockedListTooltip1: 'Sorry, your current plan lets you access up to ',
  lockedListTooltip2: ' social accounts at the same time (and any business accounts you’re a team member on as long as the owner is on a Business Plan). We’ll keep these other ones safe and sound until you’re ready to upgrade!',
};

storiesOf('ProfileSidebar', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
        {getStory()}
    </Provider>,
  )
  .add('should display a list of profiles', () => (
    <ProfileSidebar
      selectedProfileId={'1234'}
      profiles={profiles}
      lockedProfiles={lockedProfiles}
      translations={translations}
      onProfileClick={action('profile click')}
      onConnectSocialAccountClick={action('connect social account click')}
      profileLimit={'3'}
    />
  ))
  .add('should display a long list of profiles', () => (
    <ProfileSidebar
      profiles={profiles}
      lockedProfiles={lotsOfProfiles()}
      translations={translations}
      onProfileClick={action('profile click')}
      selectedProfile={profiles[0]}
      onConnectSocialAccountClick={action('connect social account click')}
      profileLimit={'3'}
    />
  ));
