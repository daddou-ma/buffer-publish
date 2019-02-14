import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PastReminders from './index';
import {
  header,
  postLists,
} from './postData';

storiesOf('PastRemindersPastReminders', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <PastReminders
      total={0}
      header={header}
      postLists={postLists}
    />
  ));
