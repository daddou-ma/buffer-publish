import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { CircleInstReminderIcon } from '@bufferapp/components';
import CardFooter from './index';

const postDetailsInstagramReminder = {
  postAction: 'You will receive a reminder at 9:21 (GMT) when it is time to post',
  isInstagramReminder: true,
};

storiesOf('CardFooter', module)
  .addDecorator(withA11y)
  .add('instagram reminder story', () => (
    <CardFooter
      postDetails={postDetailsInstagramReminder}
      icon={<CircleInstReminderIcon color="instagram" />}
      message="You will receive a reminder at 9:21 (GMT) when it is time to post"
      onDeleteClick
      onSubmitClick
      onEditClick
    />
  ));
