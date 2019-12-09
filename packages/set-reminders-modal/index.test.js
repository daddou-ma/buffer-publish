import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Button } from '@bufferapp/ui';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import SetRemindersModalWrapper from './index';
import SetRemindersModal from './components/SetRemindersModal';

describe('SetRemindersModal', () => {
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
        i18n: {
          translations: {
            'set-reminders-modal': translations['set-reminders-modal'],
          },
        },
      });
    });

    it('renders', () => {
      const wrapper = mount(
        <Provider store={store}>
          <SetRemindersModalWrapper />
        </Provider>
      );
      expect(wrapper.find(SetRemindersModal).length).toBe(1);
      wrapper.unmount();
    });

    it('dispatches a hideSetRemindersModal action when clicks on dismiss button', () => {
      const wrapper = mount(
        <Provider store={store}>
          <SetRemindersModalWrapper />
        </Provider>
      );

      // User is in the modal and clicks on dismiss
      wrapper
        .find(Button)
        .at(0)
        .simulate('click');

      expect(store.dispatch).toHaveBeenCalledWith(
        modalsActions.hideSetRemindersModal()
      );
      wrapper.unmount();
    });
  });
});
