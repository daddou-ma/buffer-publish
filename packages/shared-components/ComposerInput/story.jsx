import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ComposerInput from './index';

storiesOf('ComposerInput', module)
  .addDecorator(checkA11y)
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
