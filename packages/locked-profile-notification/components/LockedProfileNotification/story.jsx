import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { withA11y } from '@storybook/addon-a11y';
import LockedProfileNotification from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

function createMockStore(type) {
  return storeFake({
    productFeatures: {
      planName: type,
      features: {},
    },
  });
}

const storeTeamMember = createMockStore('teamMember');
const storeFree = createMockStore('free');
const storePro = createMockStore('pro');
const storeBusiness = createMockStore('business');

storiesOf('Locked Profile Notification', module)
  .addDecorator(withA11y)
  .add('free user', () => (
    <Provider store={storeFree}>
      <LockedProfileNotification
        onClickUpgrade={action('onClickUpgrade')}
        profileLimit={3}
        isOwner
      />
    </Provider>
  ))
  .add('pro user', () => (
    <Provider store={storePro}>
      <LockedProfileNotification
        onClickUpgrade={action('onClickUpgrade')}
        profileLimit={8}
        isOwner
      />
    </Provider>
  ))
  .add('business', () => (
    <Provider store={storeBusiness}>
      <LockedProfileNotification
        onClickUpgrade={action('onClickUpgrade')}
        profileLimit={100}
        isOwner
      />
    </Provider>
  ))
  .add('teamMember', () => (
    <Provider store={storeTeamMember}>
      <LockedProfileNotification isOwner={false} />
    </Provider>
  ));
