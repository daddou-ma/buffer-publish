import React from 'react';
import createStore from '@bufferapp/publish-store';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ProfilePage from './index';

const history = createHistory();
const store = createStore();
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
  .add('should render settings', () => (
    <ProfilePage
      match={{
        params: {
          profileId: 'someProfileId',
          tabId: 'settings',
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
  ));
