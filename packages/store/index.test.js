jest.mock('redux');
jest.mock('@bufferapp/product-features', () => {
  return { WithFeatureLoader: jest.fn().mockImplementation((input) => (input)) };
});

import { createStore } from 'redux'; // eslint-disable-line import/first
import store from './index'; // eslint-disable-line import/first


describe('store', () => {
  it('should create a store', () => {
    store();
    expect(createStore)
      .toBeCalled();
  });

  it('should hook up redux devtools', () => {
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ = jest.fn(() => () => {});
    store();
    expect(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      .toBeCalled();
  });
});
