import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import Sidebar from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const fakeUser = {
  loading: false,
  id: '1234',
  name: 'Test User',
  email: 'test@buffer.com',
  avatar: '',
  features: ['paid_users_in_new_publish'],
};

function createMockStore(free) {
  return storeFake({
    productFeatures: {
      planName: free ? 'free' : 'pro',
      features: {},
    },
    i18n: {
      translations: {
        example: {},
      },
    },
    appSidebar: {
      user: fakeUser,
    },
    environment: {
      environment: 'production',
    },
  });
}

const storeFree = createMockStore(true);
const storePro = createMockStore(false);

storiesOf('Sidebar', module)
  .addDecorator(withA11y)
  .add('should show app sidebar', () => (
    <Provider store={storePro}>
      <div style={{ width: '65px', height: '100%', display: 'flex' }}>
        <Sidebar
          activeProduct="publish"
          onMenuItemClick={action('onMenuItemClick')}
          onUpgradeToProClick={action('onUpgradeToProClick')}
        />
      </div>
    </Provider>
  ))
  .add('should show app sidebar with updgrade to Pro link', () => (
    <Provider store={storeFree}>
      <div style={{ width: '65px', height: '100%', display: 'flex' }}>
        <Sidebar
          activeProduct="publish"
          onMenuItemClick={action('onMenuItemClick')}
          onUpgradeToProClick={action('onUpgradeToProClick')}
          isProUpgradeUser
        />
      </div>
    </Provider>
  ))
  .add('should show app sidebar with return to classic', () => (
    <Provider store={storePro}>
      <div style={{ width: '65px', height: '100%', display: 'flex' }}>
        <Sidebar
          activeProduct="publish"
          onMenuItemClick={action('onMenuItemClick')}
          onUpgradeToProClick={action('onUpgradeToProClick')}
          onReturnToClassicClick={action('onReturnToClassicClick')}
          isAbleToReturnToClassicUser
        />
      </div>
    </Provider>
  ))
  .add('should show app sidebar with all things enabled', () => (
    <Provider store={storeFree}>
      <div style={{ width: '65px', height: '100%', display: 'flex' }}>
        <Sidebar
          activeProduct="publish"
          onMenuItemClick={action('onMenuItemClick')}
          onUpgradeToProClick={action('onUpgradeToProClick')}
          onReturnToClassicClick={action('onReturnToClassicClick')}
          isAbleToReturnToClassicUser
          isProUpgradeUser
        />
      </div>
    </Provider>
  ));
