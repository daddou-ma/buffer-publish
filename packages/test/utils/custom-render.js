import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import reducers from '@bufferapp/publish-store/reducers';
import composedMiddlewares from '@bufferapp/publish-store/middlewares';
import { createMemoryHistory } from 'history';
import {
  ConnectedRouter as Router,
  connectRouter,
} from 'connected-react-router';

const historyMemory = createMemoryHistory();

const createReducer = (asyncReducers = {}, history = historyMemory) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
    ...asyncReducers,
  });

const customStore = ({ initialState = undefined, history = historyMemory }) =>
  createStore(
    createReducer(combineReducers(reducers)),
    initialState,
    composedMiddlewares(history)
  );

const customRender = (
  ui,
  {
    route = '/',
    history = createMemoryHistory({
      initialEntries: [route],
    }),
    initialState,
    store = customStore({ initialState, history }),
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    // adding `store` and `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
    store,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
