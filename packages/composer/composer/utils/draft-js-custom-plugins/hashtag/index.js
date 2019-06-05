import Hashtag from './Hashtag';
import hashtagStrategy, { HASHTAG_REGEX } from './hashtagStrategy';

const createHashtagPlugin = () => ({
  decorators: [
    {
      strategy: hashtagStrategy,
      component: Hashtag,
    },
  ],
});

export default createHashtagPlugin;
export { HASHTAG_REGEX };
