import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { withA11y } from '@storybook/addon-a11y';
import DateTimePreferences from './index';

const store = createStore(formReducer);

storiesOf('DateTimePreferences', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('a story', () => <DateTimePreferences />)
  .add('time format can be 24 hour', () => (
    <DateTimePreferences
      twentyFourHourTime
      changeTwentyFourHourFormat={action('change twenty four hour format')}
      changeStartOfWeek={action('change day to start the week')}
    />
  ))
  .add('week can start on Monday', () => (
    <DateTimePreferences
      weekStartsMonday
      changeTwentyFourHourFormat={action('change twenty four hour format')}
      changeStartOfWeek={action('change day to start the week')}
    />
  ));
