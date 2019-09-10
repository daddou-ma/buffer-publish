import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import NoteWrapper from './index';

storiesOf('Preview', module)
  .addDecorator(checkA11y)
  .add('note wrapper', () => (
    <NoteWrapper
      saveNote={() => {}}
    />
  ));
