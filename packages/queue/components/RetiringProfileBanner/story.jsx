import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import RetiringProfileBanner from './index';

storiesOf('RetiringProfileBanner', module)
  .addDecorator(withA11y)
  .add('default', () => <RetiringProfileBanner />);
