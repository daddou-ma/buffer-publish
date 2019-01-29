import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import InstagramDirectPosting from './index';


storiesOf('InstagramDirectPosting', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <InstagramDirectPosting
      onDirectPostingClick={action('onDirectPostingClick')}
    />
  ));
