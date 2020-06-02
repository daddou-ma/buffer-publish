import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import LockedProfileNotification, {
  reducer,
  actions,
  actionTypes,
} from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  user: {
    id: 'id1',
    profile_limit: 3,
  },
  profileSidebar: {
    selectedProfile: {
      ownerId: 'id2',
    },
  },
});

describe('LockedProfileNotification', () => {
  it('should render', () => {
    const wrapper = mount(
      <Provider store={store}>
        <LockedProfileNotification />
      </Provider>
    );
    expect(wrapper.find(LockedProfileNotification).length).toBe(1);
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
