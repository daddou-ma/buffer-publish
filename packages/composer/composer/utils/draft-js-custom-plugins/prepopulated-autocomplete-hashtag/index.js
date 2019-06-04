import PrepopulatedHashtag from './PrepopulatedHashtag';
import prepopulatedHashtagStrategy from './prepopulatedHashtagStrategy';
import prepopulatedHashtagEntityStrategy from './prepopulatedHashtagEntityStrategy';
import addPrepopulatedHashtag from './modifiers/addPrepopulatedHashtag';

const createPrepopulatedHashtagPlugin = () => ({
  decorators: [
    {
      strategy: prepopulatedHashtagEntityStrategy,
      component: PrepopulatedHashtag,
    },
  ],
});

export default createPrepopulatedHashtagPlugin;
export { prepopulatedHashtagStrategy, addPrepopulatedHashtag };
