import React from 'react';
import { storiesOf } from '@storybook/react';
import store, { history } from '@bufferapp/publish-store';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import { withA11y } from '@storybook/addon-a11y';
import App from './index';

storiesOf('App', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => (
    <Provider store={store}>
      <Router history={history}>{getStory()}</Router>
    </Provider>
  ))
  .add('should render application', () => <App />);
