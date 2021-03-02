import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import GlobalEmptyState from './index';

const primaryAction = {
  onClick: action('on-click'),
  label: 'Switch To Nike',
};

const secondaryAction = {
  onClick: action('on-click'),
  label: 'Sign up',
};

storiesOf('GlobalEmptyState', module)
  .addDecorator(withA11y)
  .add('with primary and secondary action', () => (
    <GlobalEmptyState
      header="This organization is missing access to our publishing tools"
      description="Looks like your organisation Luna Sneakers doesn’t have access to our publishing tools quite yet. To add this, sign up below or switch to your other organisation Green Growers to gain access."
      imageSrc="https://buffer-publish.s3.amazonaws.com/images/campaign-sent-1.png"
      primaryAction={primaryAction}
      secondaryAction={secondaryAction}
    />
  ))
  .add('with secondary action', () => (
    <GlobalEmptyState
      header="This organization is missing access to our publishing tools"
      description="Your organisation Luna Sneakers doesn’t have access to our publishing tools. The administrator jess@lunasneakers.com can add this feature. If you can’t reach them, for whatever reason, get in touch with us."
      imageSrc="https://buffer-publish.s3.amazonaws.com/images/campaign-sent-1.png"
      secondaryAction={secondaryAction}
    />
  ));
