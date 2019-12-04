import getCharacterBeforeSelectionStart from './utils/getCharacterBeforeSelectionStart';

const createInspectSelectionPlugin = () => {
  const store = {
    getEditorState: undefined,
  };

  return {
    getCharacterBeforeSelectionStart: getCharacterBeforeSelectionStart.bind(
      null,
      store
    ),

    initialize: ({ getEditorState }) => {
      store.getEditorState = getEditorState;
    },
  };
};

export default createInspectSelectionPlugin;
