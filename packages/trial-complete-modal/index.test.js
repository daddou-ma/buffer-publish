import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Button } from '@bufferapp/ui';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import Modal, { reducer, actions, actionTypes, middleware } from './index';
import TrialCompleteModal from './components/TrialCompleteModal';

describe('TrialCompleteModal', () => {
  describe('Component', () => {
    let store;

    beforeEach(() => {
      const storeFake = state => ({
        default: () => {},
        subscribe: () => {},
        dispatch: jest.fn(),
        getState: () => ({ ...state }),
      });

      store = storeFake({
        trialCompleteModal: {
          hasExpiredBusinessTrial: false,
          hasExpiredProTrial: true,
          isPremiumBusiness: false,
        },
        i18n: {
          translations: {
            'trial-complete-modal': translations['trial-complete-modal'],
          },
        },
      });
    });

    it('renders', () => {
      const wrapper = mount(
        <Provider store={store}>
          <Modal />
        </Provider>
      );
      expect(wrapper.find(TrialCompleteModal).length).toBe(1);
      wrapper.unmount();
    });

    it('dispatches a cancelTrial action when click on Cancel Button in the Trial Complete Modal', () => {
      const wrapper = mount(
        <Provider store={store}>
          <Modal />
        </Provider>
      );

      // User clicks on Cancel Button
      wrapper
        .find(TrialCompleteModal)
        .find(Button)
        .at(0)
        .find('button')
        .at(0)
        .simulate('click');

      expect(store.dispatch).toHaveBeenCalledWith(actions.cancelTrial());
      wrapper.unmount();
    });

    it('dispatches a completeAndUpgrade action when click on Complete Button in the Trial Complete Modal', () => {
      const wrapper = mount(
        <Provider store={store}>
          <Modal />
        </Provider>
      );

      // User clicks on Complete Button
      wrapper
        .find(TrialCompleteModal)
        .find(Button)
        .at(1)
        .find('button')
        .at(0)
        .simulate('click');

      expect(store.dispatch).toHaveBeenCalledWith(actions.completeAndUpgrade());
      wrapper.unmount();
    });
  });

  it('exports reducer', () => {
    expect(reducer).toBeDefined();
  });

  it('exports actions', () => {
    expect(actions).toBeDefined();
  });

  it('exports actionTypes', () => {
    expect(actionTypes).toBeDefined();
  });

  it('exports middleware', () => {
    expect(middleware).toBeDefined();
  });
});
