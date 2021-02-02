import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import {
  render,
  screen,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { getURL } from '@bufferapp/publish-server/formatters';
import userEvent from '@testing-library/user-event';
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
  globalAccount: {
    shouldRedirectToAccountChannels: true,
  },
});

describe('ProfilesDisconnectedBanner', () => {
  test('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ProfilesDisconnectedBanner />
      </Provider>
    );
    expect(wrapper.find(ProfilesDisconnectedBanner).length).toBe(1);
  });
  test('opens account channels when user clicks on Reconnect button ', () => {
    const hostname = 'publish.local.buffer.com';
    window.location.assign = jest.fn();
    window.location.hostname = hostname;

    render(<ProfilesDisconnectedBanner />, {
      initialState: {
        globalAccount: { shouldRedirectToAccountChannels: true },
      },
    });
    const reconnectButton = screen.getByRole('button');

    userEvent.click(reconnectButton);

    expect(window.location.assign).toHaveBeenCalledWith(
      getURL.getAccountChannelsURL()
    );
    window.location.assign.mockRestore();
  });
});
