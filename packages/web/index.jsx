import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

import createStore, { history } from '@bufferapp/publish-store';
import App from './components/App';
import getErrorBoundary from './components/ErrorBoundary';
import BoundaryFallback from './components/ErrorBoundary/errorComponent';
import UnsupportedBrowserMessage from './components/UnsupportedBrowserMessage';

const store = createStore();

store.dispatch({
  type: 'APP_INIT',
});

const ErrorBoundary = getErrorBoundary();

const isIE11orLower = window.navigator.userAgent.match(/(MSIE|Trident)/);

if (isIE11orLower) {
  render(<UnsupportedBrowserMessage />, document.getElementById('root'));
} else {
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
}
