import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';
import createHistory from 'history/createHashHistory';
import store from '@bufferapp/publish-store';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import Preferences from './index';

const history = createHistory();

storiesOf('Preferences', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => (
    <Provider store={store}>
      <Router history={history}>{getStory()}</Router>
    </Provider>
  ))
  .add('default', () => (
    <Preferences
      translations={translations.preferences}
      selectedTabId="general"
      onTabClick={action('onTabClick')}
      onBackToDashboardClick={e => {
        e.preventDefault();
        action('onBackToDashboardClick')(e);
      }}
      onUnknownTab={action('onUnknownTab')}
    />
  ))
  .add('with tab selected', () => (
    <Preferences
      translations={translations.preferences}
      selectedTabId="security"
      onTabClick={action('onTabClick')}
      onBackToDashboardClick={e => {
        e.preventDefault();
        action('onBackToDashboardClick')(e);
      }}
      onUnknownTab={action('onUnknownTab')}
    />
  ))
  .add('with unknown tab', () => (
    <Preferences
      translations={translations.preferences}
      selectedTabId="generalz"
      onTabClick={action('onTabClick')}
      onBackToDashboardClick={e => {
        e.preventDefault();
        action('onBackToDashboardClick')(e);
      }}
      onUnknownTab={action('onUnknownTab')}
    />
  ));
