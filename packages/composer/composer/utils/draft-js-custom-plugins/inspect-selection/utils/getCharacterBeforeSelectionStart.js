/**
 * Note: Both SelectionState.getStartOffset() and String.prototype.charAt() don't
 * support non-BMP characters: surrogate pairs are treated individually.
 *
 * This isn't an issue as getCharacterBeforeSelectionStart() is currently only
 * used to determine if that character is whitespace or not; but we'll want
 * to keep this limitation in mind if we start using that method for other purposes.
 */

const getCharacterBeforeSelectionStart = function(store) {
  const editorState = store.getEditorState();
  const selectionState = editorState.getSelection();

  const startOffset = selectionState.getStartOffset();
  if (startOffset === 0) return null;

  const startKey = selectionState.getStartKey();
  const selectedBlock = editorState
    .getCurrentContent()
    .getBlockForKey(startKey);
  const characterBeforeSelectionStart = selectedBlock
    .getText()
    .charAt(startOffset - 1);

  return characterBeforeSelectionStart;
};

export default getCharacterBeforeSelectionStart;
