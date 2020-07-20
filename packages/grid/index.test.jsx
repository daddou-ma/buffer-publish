import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Grid, { reducer, actions, actionTypes, middleware } from './index';
import GridPosts from './components/GridPosts';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Grid', () => {
  it('should render', () => {
    const store = storeFake({
      grid: {
        byProfileId: {
          abc: {
            loading: true,
            gridPosts: [],
            total: 0,
          },
        },
      },
      user: {
        isBusinessUser: false,
      },
      profileSidebar: {
        selectedProfile: {
          isManager: true,
          permissions: ['buffer_write'],
        },
      },
    });
    const wrapper = mount(
      <Provider store={store}>
        <Grid profileId="abc" />
      </Provider>
    );
    expect(wrapper.find(GridPosts).length).toBe(1);
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
