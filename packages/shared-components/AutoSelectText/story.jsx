import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import { action } from '@storybook/addon-actions';
import AutoSelectText from './index';

storiesOf('AutoSelectText', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <AutoSelectText onSelect={action('onSelect')}>{'pKaA-p6yx-gIa5-mM7k'}</AutoSelectText>
  ))
  .add('copyToClipboard', () => (
    <AutoSelectText onSelect={action('onSelect')} copyToClipboard>
      {'pKaA-p6yx-gIa5-mM7k'}
    </AutoSelectText>
  ));
