import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import InstagramDirectPostingBanner from './index';

storiesOf('InstagramDirectPostingBanner', module)
  .addDecorator(withA11y)
  .add('default', () => <InstagramDirectPostingBanner />);
