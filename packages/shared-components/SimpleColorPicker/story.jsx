import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import SimpleColorPicker from './index';

const colors = [
  { color: '#9C2BFF', colorName: 'purple' },
  { color: '#D925AC', colorName: 'pink' },
  { color: '#F0A8DE', colorName: 'pink lighter' },
];

storiesOf('ColorPicker|SimpleColorPicker', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <SimpleColorPicker
      colors={colors}
      colorSelected=""
      onColorClick={action('on-color-click')}
    />
  ))
  .add('with color selected', () => (
    <SimpleColorPicker
      colors={colors}
      colorSelected="#D925AC"
      onColorClick={action('on-color-click')}
    />
  ));
