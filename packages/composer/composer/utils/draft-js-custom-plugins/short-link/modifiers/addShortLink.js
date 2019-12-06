/**
 * Replace a long link with a short link entity.
 *
 * This process is seamless for users:
 *
 * - It doesn't change the editor's SelectionState
 * - By default, it doesn't impact the undo stack – if the action is user-generated
 *   though (e.g. by clicking on a button), set the isUserAction option to true
 *   to create a new undo stack boundary
 */

import { EditorState, Modifier, SelectionState } from '@bufferapp/draft-js';

const addShortLink = (
  editorState,
  contentBlock,
  linkData,
  { isUserAction = false } = {}
) => {
  const blockKey = contentBlock.getKey();
  let contentState = editorState.getCurrentContent();
  const originalSelectionBefore = contentState.getSelectionBefore();
  const originalSelection = editorState.getSelection();
  const currentEntityKey = contentBlock.getEntityAt(linkData.indices[0]);

  const isAlreadyShortEntity =
    currentEntityKey !== null &&
    contentState.getEntity(currentEntityKey).getType() === 'SHORT_LINK';

  if (isAlreadyShortEntity) return editorState;

  /**
   * Create and apply entity
   */
  contentState = contentState.createEntity('SHORT_LINK', 'IMMUTABLE', {
    unshortenedLink: linkData.link,
    shortLink: linkData.shortLink,
  });
  const entityKey = contentState.getLastCreatedEntityKey();

  const targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: linkData.indices[0],
    focusKey: blockKey,
    focusOffset: linkData.indices[1],
  });

  contentState = Modifier.replaceText(
    contentState,
    targetRange,
    linkData.shortLink,
    null,
    entityKey
  );

  /**
   * If current selection is after the replaced range of text, offset it
   * accordingly to the length of text we've added/removed
   */
  let newSelection = originalSelection;

  const isSelectionInTargetBlock =
    originalSelection.getAnchorKey() === targetRange.getAnchorKey();

  const isCurrentSelectionAfterReplacedRange =
    originalSelection.getAnchorOffset() >= targetRange.getFocusOffset();

  if (isSelectionInTargetBlock && isCurrentSelectionAfterReplacedRange) {
    const offset = linkData.link.length - linkData.shortLink.length;

    newSelection = newSelection.merge({
      anchorOffset: originalSelection.getAnchorOffset() - offset,
      focusOffset: originalSelection.getFocusOffset() - offset,
    });
  }

  /**
   * Set selectionBefore/After back to what they were before they were changed
   * by Modifier.applyEntity for proper undo/redo behavior.
   */
  contentState = contentState.merge({
    selectionBefore: originalSelectionBefore,
    selectionAfter: newSelection,
  });

  let newEditorState;

  if (isUserAction) {
    newEditorState = EditorState.push(
      editorState,
      contentState,
      'apply-entity'
    );

    newEditorState = EditorState.set(newEditorState, {
      selection: newSelection,
    });
  } else {
    /**
     * Instead of using EditorState.push() which normally should be used for pushing
     * new actions to the editor, we update the editor's state directly in order
     * to keep the undo stack as is. The original SelectionState is also preserved
     * for the process to be completely seamless to users, and lastChangeType is
     * updated to 'apply-entity' so that future keystrokes/changes are considered
     * boundary states for undo/redo.
     */
    newEditorState = EditorState.set(editorState, {
      currentContent: contentState,
      lastChangeType: 'apply-entity',
      selection: newSelection,
    });
  }

  return newEditorState;
};

export default addShortLink;
