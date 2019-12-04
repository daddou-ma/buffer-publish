import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { CircleInstReminderIcon } from '@bufferapp/components';
import CardFooter from './index';

const postDetailsInstagramReminder = {
  postAction:
    'You will receive a reminder at 9:21 (GMT) when it is time to post',
  isInstagramReminder: true,
};

storiesOf('Cards|Basic Elements/CardFooter', module)
  .addDecorator(withA11y)
  .add('instagram reminder story', () => (
    <CardFooter
      postDetails={postDetailsInstagramReminder}
      icon={<CircleInstReminderIcon color="instagram" />}
      message="You will receive a reminder at 9:21 (GMT) when it is time to post"
      onDeleteClick={action('delete-click')}
      onSubmitClick={action('submit-click')}
      onEditClick={action('edit-click')}
    />
  ));
