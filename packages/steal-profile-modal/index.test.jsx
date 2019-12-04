import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Example, { reducer, actions, actionTypes } from './index';
import StealProfileModal from './components/StealProfileModal';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('StealProfileModal', () => {
  it('should render', () => {
    const store = storeFake({
      stealProfileModal: {
        showStealProfileModal: false,
      },
      i18n: {
        translations: {
          'steal-profile-modal': {
            headline1: 'headline1',
            headline2: 'headline2',
          },
        },
      },
      modals: {
        stealProfileUsername: 'username',
      },
      appSidebar: {
        user: {
          email: 'username@mail.com',
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Example />
      </Provider>
    );
    expect(wrapper.find(StealProfileModal).length).toBe(1);
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
});
