import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import GeneralSettings, {
  actions,
  actionTypes,
  middleware,
  reducer,
} from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  generalSettings: {},
  appSidebar: {
    user: {},
  },
  profileSidebar: {
    selectedProfile: {},
  },
});

describe('GeneralSettings', () => {
  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <GeneralSettings />
      </Provider>
    );
    expect(wrapper.find(GeneralSettings).length).toBe(1);
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
