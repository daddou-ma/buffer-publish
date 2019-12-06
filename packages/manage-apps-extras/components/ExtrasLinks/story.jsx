import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import ExtrasLinks from './index';

storiesOf('ExtrasLinks', module)
  .addDecorator(withA11y)
  .add('should show text and links', () => <ExtrasLinks />);
