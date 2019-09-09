import React from 'react';
import { storiesOf } from '@storybook/react';
import { selectedProfile } from '@bufferapp/publish-profile-sidebar/mockData/profiles';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import { checkA11y } from 'storybook-addon-a11y';
import StoryGroupWrapper from './index';

storiesOf('StoryGroup', module)
  .addDecorator(checkA11y)
  .add('story group wrapper', () => (
    <StoryGroupWrapper
      selectedProfile={selectedProfile}
      translations={translations['story-group-composer']}
      saveNote={() => {}}
      onDateTimeSlotPickerSubmit={() => {}}
      uses24hTime
      timezone="Asia/Tehran"
      weekStartsMonday={false}
      isScheduleLoading={false}
    />
  ));
