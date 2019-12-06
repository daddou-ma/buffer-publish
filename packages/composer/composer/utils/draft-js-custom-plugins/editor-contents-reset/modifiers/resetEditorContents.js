/**
 * Reset an editor's contents
 */
import { EditorState, Modifier, SelectionState } from '@bufferapp/draft-js';

const resetEditorContents = editorState => {
  let contentState = editorState.getCurrentContent();
  const contentBlock = contentState.getFirstBlock();
  const contentBlockKey = contentBlock.getKey();

  const allSelected = new SelectionState({
    anchorKey: contentBlockKey,
    anchorOffset: 0,
    focusKey: contentBlockKey,
    focusOffset: contentBlock.getLength(),
    hasFocus: true,
  });

  contentState = Modifier.removeRange(contentState, allSelected, 'backward');
  let newEditorState = EditorState.push(
    editorState,
    contentState,
    'remove-range'
  );
  newEditorState = EditorState.acceptSelection(
    newEditorState,
    SelectionState.createEmpty(contentBlockKey)
  );

  return newEditorState;
};

export default resetEditorContents;
