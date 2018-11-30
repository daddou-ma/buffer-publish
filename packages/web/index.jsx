import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

import createStore, { history } from '@bufferapp/publish-store';
import App from './components/App';

/**
 * Setup Bugsnag
 * https://docs.bugsnag.com/platforms/javascript/react/#installation
 */
let ErrorBoundary;
if (window._bugsnagConfig) {
  window.bugsnagClient = bugsnag(window._bugsnagConfig);
  window.bugsnagClient.use(bugsnagReact, React);
  ErrorBoundary = window.bugsnagClient.getPlugin('react');
} else {
  ErrorBoundary = React.Fragment; // no-op component
}

const store = createStore();

store.dispatch({
  type: 'APP_INIT',
});

render(
  <ErrorBoundary>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </ErrorBoundary>,
  document.getElementById('root'),
);
