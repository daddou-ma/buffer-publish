import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import GridPosts from './index';
import {
  gridPosts,
} from './postData';

storiesOf('GridPosts', module)
  .addDecorator(checkA11y)
  .add('should show grid posts', () => (
    <GridPosts
      gridPosts={gridPosts}
    />
  ));
