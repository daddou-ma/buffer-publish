import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import LanguagePreferences from './index';

storiesOf('LanguagePreferences', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <LanguagePreferences onSelectLanguage={action('onSelectLanguage')} />
  ));
