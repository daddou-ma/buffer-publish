import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import PostingSchedule, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';
import {
  settingsHeader,
  days,
  timezones,
} from './components/PostingSchedule/settingsData';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('PostingSchedule', () => {
  it('should render', () => {
    const store = storeFake({
      postingSchedule: {
        loading: false,
        settingsHeader,
        days,
        profileTimezone: 'Europe/London',
        items: timezones,
      },
      i18n: {
        translations: {
          example: {
            loggedIn: 'Logged In...',
            loggedOut: 'Logged Out...',
          },
        },
      },
      user: {
        hasTwentyFourHourTimeFormat: false,
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <PostingSchedule />
      </Provider>
    );
    expect(wrapper.find(PostingSchedule).length).toBe(1);
  });

  it('should export reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('should export actions', () => {
    expect(actions).toBeDefined();
  });

  it('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
});
