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

  /* Test not working, temporarily dismissed. Invariant Violation: Element type is invalid:
  expected a string (for built-in components) or a class/function (for composite components) but
  got: undefined. You likely forgot to export your component from the file it's defined in, or
  you might have mixed up default and named imports. Check the render method of `FeatureLoader` */

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
  ));
