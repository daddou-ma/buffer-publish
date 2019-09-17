// use story.js files as snapshots
import initStoryshots, { snapshotWithOptions } from '@storybook/addon-storyshots';
import { Elements, StripeProvider } from 'react-stripe-elements';

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
