import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import PostingTimeForm from './index';

const store = createStore(combineReducers({ form: formReducer }));

storiesOf('PostingTimeForm', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('default', () => (
    <PostingTimeForm handleSubmit={action('on-submit-action')} />
  ))
  .add('with 24hour time', () => (
    <PostingTimeForm
      handleSubmit={action('on-submit-action')}
      twentyfourHourTime
    />
  ))
  .add('with submitting delay', () => (
    <PostingTimeForm
      onSubmit={() =>
        new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 2000);
        })
      }
    />
  ));
