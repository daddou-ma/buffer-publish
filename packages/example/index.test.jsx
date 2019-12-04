import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Example, { reducer, actions, actionTypes, middleware } from './index';
import LoggedIn from './components/LoggedIn';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Example', () => {
  it('should render', () => {
    const store = storeFake({
      example: {
        loggedIn: false,
      },
      i18n: {
        translations: {
          example: {
            loggedIn: 'Logged In...',
            loggedOut: 'Logged Out...',
          },
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Example />
      </Provider>
    );
    expect(wrapper.find(LoggedIn).length).toBe(1);
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
