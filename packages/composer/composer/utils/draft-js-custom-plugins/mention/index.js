import Mention from './Mention';
import mentionStrategy, { MENTION_REGEX } from './mentionStrategy';

const createMentionPlugin = () => ({
  decorators: [
    {
      strategy: mentionStrategy,
      component: Mention,
    },
  ],
});

export default createMentionPlugin;
export { MENTION_REGEX };
