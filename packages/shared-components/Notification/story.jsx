import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import Notification from './index';

storiesOf('Notification container', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <Notification title="Title goes here" body="Some text goes here" />
  ))
  .add('No title', () => <Notification body="Some text goes here" />)
  .add('Info message', () => (
    <Notification type="info" body="Some text goes here" />
  ))
  .add('Alert message', () => (
    <Notification type="alert" body="Some text goes here" />
  ))
  .add('Include link', () => (
    <Notification
      title="Title goes here"
      body="Some text goes here"
      button={{ text: 'Click Here', action: action('Button clicked') }}
    />
  ))
  .add('Include secondary link', () => (
    <Notification
      title="Title goes here"
      body="Some text goes here"
      button={{
        text: 'Click Here',
        action: action('Button clicked'),
        type: 'secondary',
      }}
    />
  ))
  .add('Unseen when provided without title or body', () => <Notification />);
