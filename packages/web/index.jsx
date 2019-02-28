import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

import createStore, { history } from '@bufferapp/publish-store';
import App from './components/App';
import getErrorBoundary from './components/ErrorBoundary';
import BoundaryFallback from './components/ErrorBoundary/errorComponent';

const store = createStore();

store.dispatch({
  type: 'APP_INIT',
});

const ErrorBoundary = getErrorBoundary();

render(
  <ErrorBoundary FallbackComponent={BoundaryFallback}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
