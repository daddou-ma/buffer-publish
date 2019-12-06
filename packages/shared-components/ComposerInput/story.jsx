import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import ComposerInput from './index';

storiesOf('ComposerInput', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <ComposerInput
      onPlaceholderClick={action('placeholder-click')}
      placeholder={'What would you like to share?'}
    />
  ))
  .add('disabled', () => (
    <ComposerInput
      onPlaceholderClick={action('placeholder-click')}
      placeholder={'What would you like to share?'}
      isDisabled
    />
  ));
