import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import ComposerEditor from './index';

storiesOf('Composer Editor', module)
  .addDecorator(withA11y)
  .add('default', () => <ComposerEditor />);
