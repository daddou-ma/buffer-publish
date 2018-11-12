import React from 'react';
import {
  action,
  linkTo,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import DraftHeader from './index';

const draftDetails = {
  creatorName: 'Ash',
  avatarUrl: 'https://buffer-uploads.s3.amazonaws.com/510521020a19000b6a00001e/a476fed03b1de4e06563d6063d7d3ee0.jpg',
  createdAt: 'March 2nd at 12:45pm (GMT)',
};

storiesOf('DraftHeader', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <DraftHeader
      draftDetails={draftDetails}
    />
  ));
