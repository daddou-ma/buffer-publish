import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { Button } from '@bufferapp/ui';
import CloseAccountHOC, {
  actions,
} from './index';
import CloseAccount from './components/CloseAccount';

function createProviderWithStore(initialState, fakeDispatch, Component) {
  const storeFake = state => ({
    default: () => {},
    subscribe: () => {},
    dispatch: fakeDispatch,
    getState: () => ({ ...state }),
  });

  const store = storeFake(initialState);

  return mount(
    <Provider store={store}>
      <Component />
    </Provider>,
  );
}

describe('close-account', () => {
  const state = {
    closeAccount: {
      showModal: false,
    },
  };
  it('renders close-account component', () => {
    const fakeDispatch = jest.fn();

    const wrapper = createProviderWithStore(state, fakeDispatch, CloseAccountHOC);

    expect(wrapper.find(CloseAccount).length).toBe(1);

    wrapper.unmount();
  });
  it('opens modal when button clicked', () => {
    const fakeDispatch = jest.fn();

    const wrapper = createProviderWithStore(state, fakeDispatch, CloseAccountHOC);

    expect(wrapper.find(CloseAccount).prop('showModal')).toBe(false);

    expect(wrapper.find(CloseAccount).at(0).find(Button).length).toBe(1);

    wrapper.find(CloseAccount).at(0).find(Button).at(0).simulate('click');

    expect(fakeDispatch).toBeCalledWith(actions.requestOpenModal());

    wrapper.unmount();
  });
});
