import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

import store, { history } from '@bufferapp/publish-store';
import './components/i18n';
import App from './components/App';
import getErrorBoundary from './components/ErrorBoundary';

function getQueryParams() {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);
  return params;
}

store.dispatch({
  type: 'APP_INIT',
  queryParams: getQueryParams(),
});

const ErrorBoundary = getErrorBoundary();

render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <App />
        </React.Suspense>
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root')
);
