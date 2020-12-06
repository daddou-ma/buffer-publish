import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import Onboarding, { reducer, actions, actionTypes, middleware } from './index';
import OnboardingManager from './components/OnboardingManager';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

describe('Onboarding', () => {
  const state = {
    onboarding: {
      canSeeOnboardingPage: true,
    },
    i18n: {
      translations: {
        'onboarding-page': {},
      },
    },
    organizations: {
      selected: {
        showUpgradeToProCta: false,
        profileLimit: 8,
      },
    },
  };
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
