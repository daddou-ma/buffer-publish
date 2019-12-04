import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import InstagramDirectPosting from './index';

storiesOf('InstagramDirectPosting', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <InstagramDirectPosting
      onDirectPostingClick={action('onDirectPostingClick')}
    />
  ));
