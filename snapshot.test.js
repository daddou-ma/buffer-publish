// use story.js files as snapshots
import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';
import { Elements, StripeProvider } from 'react-stripe-elements';

initStoryshots({
  suit: 'Snapshots',
  configPath: '.storybookStoryshot/',
  test: snapshotWithOptions(story => ({
    createNodeMock: (element) => {
      if (element.type === Elements) {
        return null;
      }
      if (element.type === StripeProvider) {
        return null;
      }
      return element;
    },
  })),
});
