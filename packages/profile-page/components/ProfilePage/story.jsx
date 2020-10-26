import React, { Component } from 'react';
import store from '@bufferapp/publish-store';
import { ConnectedRouter as Router } from 'connected-react-router';
import createHistory from 'history/createHashHistory';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { DragDropContext } from 'react-dnd';
import TestBackend from 'react-dnd-test-backend';
import ProfilePage from './index';
import {
  selectedProfile,
  profiles,
} from '../../../profile-sidebar/mockData/profiles';

const history = createHistory();
const stubbedHistory = {
  location: {
    pathname: '/profile/1234/tab/queue',
    search: '',
    hash: '',
    state: {},
  },
};

/* eslint-disable react/prop-types */
class _TestContextContainer extends Component {
  // eslint-disable-line
  render() {
    return <div>{this.props.children}</div>;
  }
}

const TestContextContainer = DragDropContext(TestBackend)(
  _TestContextContainer
);

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

function createMockStore(profileList) {
  return storeFake({
    modals: {
      showInstagramDirectPostingModal: false,
    },
    i18n: {
      translations: {
        'profile-sidebar': {
          connectButton: 'Manage Channels',
        },
      },
    },
    queue: {
      editMode: false,
      isBusinessOnInstagram: false,
      isInstagramLoading: false,
      editingPostId: null,
      byProfileId: {
        1234: selectedProfile,
      },
    },
    profileSidebar: {
      selectedProfile,
      isLockedProfile: false,
      profiles: profileList,
      hasInstagram: false,
      hasTwitter: true,
      hasFacebook: true,
    },
    user: {
      canStartProTrial: true,
      trial: {
        onTrial: false,
      },
    },
    generalSettings: {
      isInstagramProfile: true,
    },
    environment: {
      environment: 'dev',
    },
    tabs: {
      draftsNeedApprovalCount: 1,
      draftsCount: 0,
    },
  });
}

const storeProfiles = createMockStore(profiles);

storiesOf('ProfilePage', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => (
    <Provider store={store}>
      <Router history={history}>{getStory()}</Router>
    </Provider>
  ))
  .addDecorator(getStory => (
    <TestContextContainer>{getStory()}</TestContextContainer>
  ))
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
  .add('should render profiles in sidebar', () => (
    <Provider store={storeProfiles}>
      <ProfilePage
        selectedProfile="1234"
        match={{
          params: {
            profileId: '1234',
            tabId: 'queue',
            profiles,
          },
        }}
        history={stubbedHistory}
      />
    </Provider>
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
