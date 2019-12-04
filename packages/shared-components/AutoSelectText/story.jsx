import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import AutoSelectText from './index';

storiesOf('AutoSelectText', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <AutoSelectText onSelect={action('onSelect')}>
      {'pKaA-p6yx-gIa5-mM7k'}
    </AutoSelectText>
  ))
  .add('copyToClipboard', () => (
    <AutoSelectText onSelect={action('onSelect')} copyToClipboard>
      {'pKaA-p6yx-gIa5-mM7k'}
    </AutoSelectText>
  ));
