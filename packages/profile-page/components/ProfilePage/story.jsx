import React from 'react';
import createStore from '@bufferapp/publish-store';
import {
  ConnectedRouter as Router,
} from 'connected-react-router';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ProfilePage from './index';

const history = createHistory();

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  appSidebar: {
    user: {
      trial: {
        onTrial: false,
      }
    }
  }
});

const stubbedHistory = {
  location: {
    pathname: '/profile/1234/tab/queue',
    search: '',
    hash: '',
    state: {} },
};

storiesOf('ProfilePage', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      <Router history={history}>
        {getStory()}
      </Router>
    </Provider>,
  )
  .add('should render', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'someTabId',
        },
      }}
      history={stubbedHistory}
    />
  ))
  .add('should render posting schedule settings', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'settings',
          childTabId: 'posting-schedule',
        },
      }}
      history={stubbedHistory}
    />
  ))
  .add('should render general settings', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'settings',
          childTabId: 'general-settings',
        },
      }}
      history={stubbedHistory}
    />
  ))
  .add('should render pastReminders', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'pastReminders',
        },
      }}
      history={stubbedHistory}
    />
  ))
  .add('should render gridPosts', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'grid',
        },
      }}
      history={stubbedHistory}
    />
  ));
