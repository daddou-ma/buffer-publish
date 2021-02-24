import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { createStore, combineReducers } from 'redux';
import { MockedProvider } from '@apollo/client/testing';
import { gql } from '@apollo/client';
import { Provider } from 'react-redux';
import reducers from '@bufferapp/publish-store/reducers';
import composedMiddlewares from '@bufferapp/publish-store/middlewares';
import { createMemoryHistory } from 'history';
import {
  ConnectedRouter as Router,
  connectRouter,
} from 'connected-react-router';
import { buildAccount } from '../generate-data';

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

const QUERY_ACCOUNT = gql`
  query GetAccount {
    account {
      id
      email
      featureFlips
      isImpersonation
      currentOrganization {
        id
        name
        canEdit
        role
        createdAt
      }
      organizations {
        id
        name
      }
      products {
        name
        userId
      }
    }
  }
`;
const mocks = [
  {
    request: {
      query: QUERY_ACCOUNT,
    },
    result: {
      data: buildAccount(),
    },
  },
];

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
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router history={history}>{children}</Router>
      </MockedProvider>
    </Provider>
  );

  return {
    ...rtlRender(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
    // adding `store` and `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details)
    history,
    store,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
