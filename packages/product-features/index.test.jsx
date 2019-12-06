import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import FeatureLoader, { reducer, middleware, WithFeatureLoader } from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('ProductFeatureComponent', () => {
  it('should render', () => {
    const store = storeFake({
      productFeatures: {
        loading: false,
        features: {
          show_stuff: true,
          not_here: false,
        },
      },
      planName: 'free',
    });
    const wrapper = mount(
      <Provider store={store}>
        <FeatureLoader>
          <div>Hello</div>
        </FeatureLoader>
      </Provider>
    );
    expect(wrapper.find(FeatureLoader).length).toBe(1);
  });

  it('should export reducer', () => {
    expect(reducer).toBeDefined();
  });
  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
  it('should export withFeatureLoader', () => {
    expect(WithFeatureLoader).toBeDefined();
  });
});
