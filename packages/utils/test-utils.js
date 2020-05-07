import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from '@bufferapp/publish-store/reducers';
import composedMiddlewares from '@bufferapp/publish-store/middlewares';
import { history, createReducer } from '@bufferapp/publish-store';

const customStore = ({ initialState = undefined }) =>
  createStore(
    createReducer(combineReducers(reducers)),
    initialState,
    composedMiddlewares(history)
  );

const customRender = (
  ui,
  { initialState, store = customStore({ initialState }), ...renderOptions } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
