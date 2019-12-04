import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import OnboardingPage from './index';

storiesOf('OnboardingPage', module)
  .addDecorator(withA11y)
  .add('should show image, title and button', () => (
    <OnboardingPage translations={translations['onboarding-page']} />
  ));
