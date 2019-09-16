import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { checkA11y } from '@storybook/addon-a11y/register';
import DateTimePreferences from './index';

const store = createStore(formReducer);

storiesOf('DateTimePreferences', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('a story', () => (
    <DateTimePreferences />
  ))
  .add('time format can be 24 hour', () => (
    <DateTimePreferences twentyFourHourTime changeTwentyFourHourFormat={action('change twenty four hour format')} changeStartOfWeek={action('change day to start the week')} />
  ))
  .add('week can start on Monday', () => (
    <DateTimePreferences weekStartsMonday changeTwentyFourHourFormat={action('change twenty four hour format')} changeStartOfWeek={action('change day to start the week')} />
  ));
