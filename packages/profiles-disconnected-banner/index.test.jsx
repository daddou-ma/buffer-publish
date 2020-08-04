import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import ProfilesDisconnectedBanner from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  profileSidebar: {
    selectedProfileId: 'id1',
    selectedProfile: {
      service: 'instagram',
    },
  },
  user: {
    canReconnectChannels: true,
  },
  organizations: {},
  i18n: {
    translations: {
      'profiles-disconnected-banner':
        translations['profiles-disconnected-banner'],
    },
  },
});

describe('ProfilesDisconnectedBanner', () => {
  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ProfilesDisconnectedBanner />
      </Provider>
    );
    expect(wrapper.find(ProfilesDisconnectedBanner).length).toBe(1);
  });
});
