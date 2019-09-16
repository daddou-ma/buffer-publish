import React from 'react';
import { storiesOf } from '@storybook/react';
import createStore, { history } from '@bufferapp/publish-store';
import { Provider } from 'react-redux';
import {
  ConnectedRouter as Router,
} from 'connected-react-router';
import { checkA11y } from '@storybook/addon-a11y/register';
import App from './index';

storiesOf('App', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={createStore()}>
      <Router history={history}>
        {getStory()}
      </Router>
    </Provider>,
  )
  .add('should render application', () => (
    <App />
  ));
