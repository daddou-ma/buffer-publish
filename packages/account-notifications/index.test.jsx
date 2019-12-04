import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Notifications, {
  reducer,
  actions,
  actionTypes,
  middleware,
} from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const state = {
  accountNotifications: {
    bufferEmpty: true,
    bufferTips: true,
    celebrations: true,
    updateSuccesses: true,
    weeklyDigests: true,
    updateFailures: true,
    newContributions: true,
    postMovedBackToDrafts: true,
  },
};

describe('Notifications', () => {
  it('should render', () => {
    const store = storeFake(state);
    const wrapper = mount(
      <Provider store={store}>
        <Notifications />
      </Provider>
    );
    expect(wrapper.find(Notifications).length).toBe(1);
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
