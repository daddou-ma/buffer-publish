import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import OnboardingPage from './index';

storiesOf('OnboardingPage', module)
  .addDecorator(checkA11y)
  .add('should show image, title and button', () => (
    <OnboardingPage
      translations={translations['onboarding-page']}
    />
  ));
