import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import SimpleColorSwatch from './index';

storiesOf('ColorPicker|SimpleColorSwatch', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <SimpleColorSwatch color="red" onColorClick={action('on-color-click')} />
  ))
  .add('selected', () => <SimpleColorSwatch color="red" selected />);
