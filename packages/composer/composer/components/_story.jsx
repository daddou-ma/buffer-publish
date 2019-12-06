import React from 'react';
import { storiesOf } from '@storybook/react';
import Composer from './App';
import useCases from '../mockData/mock-initial-props';

const stories = {
  create: 'Dashboard (create new)',
  edit: 'Dashboard (edit custom-time update)',
  editWithLinkAttachment: 'Dashboard (edit update w/ link attachment)',
  extension: 'Extension',
  instagramOneImage: 'Instagram (one image)',
  instagramMultipleImages: 'Instagram (multiple images)',
};

Object.keys(stories).forEach(useCase => {
  storiesOf('Composer').add(stories[useCase], () => (
    <div>
      <Composer {...useCases[useCase]} />
    </div>
  ));
});
