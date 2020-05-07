import { connectRouter } from 'connected-react-router';
import { createBrowserHistory as createHistory } from 'history';
import { createStore, combineReducers } from 'redux';

import reducers from './reducers';
import composedMiddlewares from './middlewares';

// Create a history object for the `connected-react-router`
// reducer and middleware to use later.
export const history = createHistory();

// This method combines all our reducers together.
export const createReducer = (asyncReducers = {}) =>
  combineReducers({
    router: connectRouter(history),
    ...reducers,
    ...asyncReducers,
  });

const store = createStore(
  createReducer(),
  undefined, // @todo: `intitialState`, I think we can leave this out?
  composedMiddlewares(history)
);

store.asyncReducers = {};

// This is how lazy-loaded packages can add their stores once loaded
store.injectReducers = function(reducerMap) {
  store.asyncReducers = {
    ...store.asyncReducers,
    ...reducerMap,
  };
  store.replaceReducer(createReducer(store.asyncReducers));
};

export default store;
