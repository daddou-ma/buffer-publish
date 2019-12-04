import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import Onboarding, { reducer, actions, actionTypes, middleware } from './index';
import OnboardingManager from './components/OnboardingManager';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Component', () => {
  const state = {
    onboarding: {
      canSeeOnboardingPage: true,
    },
    i18n: {
      translations: {
        'onboarding-page': {},
      },
    },
  };
  test('should render', () => {
    const store = storeFake(state);
    const wrapper = mount(
      <Provider store={store}>
        <Onboarding canSeeOnboardingPage translations="" />
      </Provider>
    );
    expect(wrapper.find(OnboardingManager).length).toBe(1);
    expect(wrapper.find(OnboardingManager).prop('canSeeOnboardingPage')).toBe(
      true
    );
    wrapper.unmount();
  });
});

describe('Onboarding', () => {
  test('should export reducer', () => {
    expect(reducer).toBeDefined();
  });

  test('should export actions', () => {
    expect(actions).toBeDefined();
  });

  test('should export actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  test('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
});
