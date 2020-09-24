import React from 'react';
import {
  render,
  cleanup,
} from '@bufferapp/publish-test-utils/utils/custom-render';
import { axe } from 'jest-axe';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import InstagramPersonalProfileNotification from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Instagram Personal Profile Notification', () => {
  it('should render', () => {
    const store = storeFake({
      profileSidebar: {
        selectedProfileId: '123',
      },
      tabs: {
        tabId: 'queue',
      }
    });
    const wrapper = mount(
      <Provider store={store}>
        <InstagramPersonalProfileNotification />
      </Provider>
    );
    expect(wrapper.find(InstagramPersonalProfileNotification).length).toBe(1);
  });

  it('a11y | Instagram personal profile notification is accessible', async () => {
    const { container } = render(
      <InstagramPersonalProfileNotification
        onDirectPostingClick={() => {}}
        profileId="123"
        tabId="queue"
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
    cleanup();
  });
});
