import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer, SubmissionError } from 'redux-form';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import Modal from './index';

const store = createStore(combineReducers({ form: formReducer }));

storiesOf('Close Account Modal', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('default', () => (
    <Modal onSubmit={action('onSubmit')} onRequestCloseModal={action('onRequestCloseModal')} />
  ))
  .add('with error', () => (
    <Modal
      onSubmit={() => {
        throw new SubmissionError({
          _error: 'Oops! Something bad happened on the server!',
        });
      }}
      onRequestCloseModal={action('onRequestCloseModal')}
    />
  ))
  .add('with submitting delay', () => (
    <Modal
      onSubmit={() =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 2000);
        })
      }
      onRequestCloseModal={action('onRequestCloseModal')}
    />
  ));
