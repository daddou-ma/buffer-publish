/**
 * Replace a range of text with a new link.
 */

import { EditorState, Modifier, SelectionState } from '@bufferapp/draft-js';

const replaceLink = (
  editorState,
  contentBlock,
  { indices, oldLink, newLink }
) => {
  const blockKey = contentBlock.getKey();
  let contentState = editorState.getCurrentContent();
  const originalSelectionBefore = contentState.getSelectionBefore();
  const originalSelection = editorState.getSelection();

  const targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: indices[0],
    focusKey: blockKey,
    focusOffset: indices[1],
  });

  contentState = Modifier.replaceText(contentState, targetRange, newLink);

  // If current selection is after the replaced range of text, offset it
  // accordingly to the length of text we've added/removed
  let newSelection = originalSelection;

  const isSelectionInTargetBlock =
    originalSelection.getAnchorKey() === targetRange.getAnchorKey();

  const isCurrentSelectionAfterReplacedRange =
    originalSelection.getAnchorOffset() >= targetRange.getFocusOffset();

  if (isSelectionInTargetBlock && isCurrentSelectionAfterReplacedRange) {
    const offset = oldLink.length - newLink.length;

    newSelection = newSelection.merge({
      anchorOffset: originalSelection.getAnchorOffset() - offset,
      focusOffset: originalSelection.getFocusOffset() - offset,
    });
  }

  // Set selectionBefore/After for proper undo/redo behavior.
  contentState = contentState.merge({
    selectionBefore: originalSelectionBefore,
    selectionAfter: newSelection,
  });

  /**
   * Instead of using EditorState.push() which normally should be used for pushing
   * new actions to the editor, we update the editor's state directly in order
   * to keep the undo stack as is. The original SelectionState is also preserved
   * for the process to be completely seamless to users, and lastChangeType is
   * updated to 'apply-text' so that future keystrokes/changes are considered
   * boundary states for undo/redo.
   */
  return EditorState.set(editorState, {
    currentContent: contentState,
    lastChangeType: 'apply-text',
    selection: newSelection,
  });
};

export default replaceLink;
