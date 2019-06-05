import ImportedMention from './ImportedMention';
import importedMentionEntityStrategy from './importedMentionEntityStrategy';
import addImportedMention from './modifiers/addImportedMention';

const createImportedMentionPlugin = () => ({
  decorators: [
    {
      strategy: importedMentionEntityStrategy,
      component: ImportedMention,
    },
  ],
});

export default createImportedMentionPlugin;
export { addImportedMention };
