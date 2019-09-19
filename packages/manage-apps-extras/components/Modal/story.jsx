import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import Modal from './index';

storiesOf('RevokeAccessModal', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <Modal
      onConfirmClick={action('onConfirmClick')}
      onCancelClick={action('onCancelClick')}
      appName={'Client 1'}
      appId={'appId1'}
    />
  ))
  .add('submitting', () => (
    <Modal
      onConfirmClick={action('onConfirmClick')}
      onCancelClick={action('onCancelClick')}
      appName={'Client 1'}
      appId={'appId1'}
      submitting
    />
  ));
