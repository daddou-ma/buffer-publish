import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y/register';
import CloseAccount from './index';

const store = createStore(combineReducers({ form: formReducer }));

storiesOf('CloseAccount', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('default', () => (
    <CloseAccount
      onRequestCloseModal={action('onRequestCloseModal')}
      onSubmit={action('onRequestCloseModal')}
    />
  ))
  .add('showModal', () => (
    <CloseAccount
      onRequestCloseModal={action('onRequestCloseModal')}
      onSubmit={action('onRequestCloseModal')}
      showModal
    />
  ));
