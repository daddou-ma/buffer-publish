import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import AppsAndExtras, {
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

describe('AppsAndExtras', () => {
  const app1 = {
    id: 'appid1',
    name: 'App 1',
  };
  const store = storeFake({
    manageAppsExtras: {
      showModalAppId: null,
      showModalAppName: '',
      connectedApps: [app1],
      submitting: false,
    },
    environment: {
      environment: 'production',
    },
    i18n: {
      translations: {},
    },
  });

  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <AppsAndExtras />
      </Provider>
    );
    expect(wrapper.find(AppsAndExtras).length).toBe(1);
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
