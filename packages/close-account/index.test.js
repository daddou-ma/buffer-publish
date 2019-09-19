import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import CloseAccount, { reducer } from './index';
import Modal from './components/Modal';
import { Button } from '@bufferapp/ui';
import { createStore } from 'redux';

describe('close-account-component', () => {
  it('opens modal', () => {

    const store = createStore(reducer, {
      closeAccount: {
        showModal: false,
      },
    });
    const onRequestOpenModal = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CloseAccount onRequestOpenModal={onRequestOpenModal} />
      </Provider>,
    );

    expect(wrapper.find(CloseAccount).find(Modal).length).toBe(0);

    wrapper.find(CloseAccount).find(Button).at(1).simulate('click');

    expect(onRequestOpenModal).toBeCalled();
  });
})
