import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import ExtrasLinks from './index';

storiesOf('ExtrasLinks', module)
  .addDecorator(checkA11y)
  .add('should show text and links', () => (
    <ExtrasLinks />
  ));
