import PrepopulatedMention from './PrepopulatedMention';
import prepopulatedMentionStrategy from './prepopulatedMentionStrategy';
import prepopulatedMentionEntityStrategy from './prepopulatedMentionEntityStrategy';
import addPrepopulatedMention from './modifiers/addPrepopulatedMention';

const createPrepopulatedMentionPlugin = () => ({
  decorators: [
    {
      strategy: prepopulatedMentionEntityStrategy,
      component: PrepopulatedMention,
    },
  ],
});

export default createPrepopulatedMentionPlugin;
export { prepopulatedMentionStrategy, addPrepopulatedMention };
