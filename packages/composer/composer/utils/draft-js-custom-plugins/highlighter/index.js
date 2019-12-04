import Highlighter from './Highlighter';
import highlighterStrategy from './highlighterStrategy';

const createHighlighterPlugin = (draft, getDraftCharacterCount) => {
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  return {
    decorators: [
      {
        strategy: highlighterStrategy.bind(
          null,
          draft,
          getDraftCharacterCount,
          store
        ),
        component: Highlighter,
      },
    ],

    initialize: ({ getEditorState }) => {
      store.getEditorState = getEditorState;
    },
  };
};

export default createHighlighterPlugin;
