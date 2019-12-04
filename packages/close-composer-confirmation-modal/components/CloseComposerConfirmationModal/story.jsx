import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import CloseComposerConfirmationModal from './index';

const translations = {
  text:
    'Are you sure you want to close the composer? You will lose your progress if you continue!',
  sure: "Yes, I'm sure",
  cancel: 'Cancel',
};

storiesOf('CloseComposerConfirmationModal', module)
  .addDecorator(withA11y)
  .add('should show modal', () => (
    <CloseComposerConfirmationModal
      translations={translations}
      onCloseComposerAndConfirmationModal={() => {}}
      onCloseComposerModal={() => {}}
      type="queue"
    />
  ));
