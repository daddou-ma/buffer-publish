// use story.js files as snapshots
import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';

const skipSupplyingRefs = [
  'CloseComposerConfirmationModal',
  'TwoFactorAuth',
  'SwitchPlanModal',
  'Sidebar',
  'ProfileSidebar',
  'ProfileSearch',
  'ProfilePage',
  'HashtagGroup',
  'App',
  'AppShell',
];

initStoryshots({
  suit: 'Snapshots',
  configPath: '.storybookStoryshot/',
  test: snapshotWithOptions(story => (skipSupplyingRefs.includes(story.kind) ? {} : ({
    createNodeMock: (element) => {
      const { Elements, StripeProvider } = require('react-stripe-elements');

      if (element.type === Elements) {
        return null;
      }
      if (element.type === StripeProvider) {
        return null;
      }
      return element;
    },
  }))),
});
