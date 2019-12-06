import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as form } from 'redux-form';

import TimezoneInputForm from './index';

const settings = (state, _) => ({ profileTimezone: 'Pacific/Midway' }); // eslint-disable-line
const store = createStore(combineReducers({ form, settings }));

const items = [
  { label: 'Pacific/Midway', timezone: 'Pacific/Midway' },
  { label: 'America/Adak', timezone: 'America/Adak' },
  { label: 'America/Anchorage', timezone: 'America/Anchorage' },
  { label: 'Pacific/Gambier', timezone: 'Pacific/Gambier' },
  { label: 'America/Dawson_Creek', timezone: 'America/Dawson_Creek' },
  { label: 'Pacific/Auckland', timezone: 'Pacific/Auckland' },
  { label: 'Pacific/Chatham', timezone: 'Pacific/Chatham' },
];

storiesOf('TimezoneInputForm', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('default', () => (
    <TimezoneInputForm
      handleSubmit={action('on-submit-action')}
      items={items}
      onChange={action('on-change-action')}
      onSelect={action('select-action')}
      onTimezoneInputFocus={action('on-timezone-input-focus')}
      onTimezoneInputBlur={action('on-timezone-input-blur')}
      onTimezoneChange={action('on-timezone-change')}
      disabled={false}
    />
  ))
  .add('disabled', () => (
    <TimezoneInputForm
      handleSubmit={action('on-submit-action')}
      items={items}
      onChange={action('on-change-action')}
      onSelect={action('select-action')}
      onTimezoneInputFocus={action('on-timezone-input-focus')}
      onTimezoneInputBlur={action('on-timezone-input-blur')}
      onTimezoneChange={action('on-timezone-change')}
      disabled
    />
  ));
