import React from 'react';

import { storiesOf } from '@storybook/react';

import { withA11y } from '@storybook/addon-a11y';

import BufferLoading from './index';

storiesOf('BufferLoading', module)
  .addDecorator(withA11y)
  .add('default', () => <BufferLoading />);
