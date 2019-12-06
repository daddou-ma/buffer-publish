/**
 * Annotate Facebook mentions with entities. Only executed once when the editor loads,
 * in order to decorate mentions that could be present in the prepopulated text.
 * Mentions written by users after the editor loads are handled by
 * draft-js-mention-plugin.
 *
 * This process is completely seamless for users: it doesn't impact the undo
 * stack, nor does it change the editor's SelectionState.
 */
import { EditorState, Modifier, SelectionState } from '@bufferapp/draft-js';
import {
  getUnicodeAwareLength,
  makeUnicodeAwareIndexUnaware,
} from '../../../../utils/StringUtils';

const addImportedMention = (editorState, unicodeAwareIndices, mentionData) => {
  let contentState = editorState.getCurrentContent();
  const originalSelectionBefore = contentState.getSelectionBefore();
  const originalSelection = editorState.getSelection();

  contentState = contentState.createEntity(
    'IMPORTED_MENTION',
    'IMMUTABLE',
    mentionData
  );
  const entityKey = contentState.getLastCreatedEntityKey();

  let entitiesBlockUnicodeAwareOffset = 0;
  let blockKey;
  const unicodeUnawareIndices = [];

  const foundBlockForIndices = contentState.getBlockMap().some(contentBlock => {
    const blockText = contentBlock.getText();
    const unicodeAwareBlockLength = getUnicodeAwareLength(blockText);

    if (
      entitiesBlockUnicodeAwareOffset + unicodeAwareBlockLength <
      unicodeAwareIndices[0]
    ) {
      entitiesBlockUnicodeAwareOffset += unicodeAwareBlockLength + 1;
      return false;
    }

    blockKey = contentBlock.getKey();

    unicodeUnawareIndices.push(
      makeUnicodeAwareIndexUnaware(blockText, unicodeAwareIndices[0]) -
        entitiesBlockUnicodeAwareOffset,
      makeUnicodeAwareIndexUnaware(blockText, unicodeAwareIndices[1]) -
        entitiesBlockUnicodeAwareOffset
    );

    return true;
  });

  // Prevent throwing if entities get out of sync (shouldn't happen, we're being defensive here)
  if (!foundBlockForIndices) return editorState;

  const targetRange = new SelectionState({
    anchorKey: blockKey,
    anchorOffset: unicodeUnawareIndices[0],
    focusKey: blockKey,
    focusOffset: unicodeUnawareIndices[1],
  });

  let newContentState = Modifier.applyEntity(
    contentState,
    targetRange,
    entityKey
  );

  /**
   * Set selectionBefore/After back to what they were before they were changed
   * by Modifier.applyEntity for proper undo/redo behavior.
   */
  newContentState = newContentState.merge({
    selectionBefore: originalSelectionBefore,
    selectionAfter: originalSelection,
  });

  /**
   * Instead of using EditorState.push() which normally should be used for pushing
   * new actions to the editor, we update the editor's state directly in order
   * to keep the undo stack as is. The original SelectionState is also preserved
   * for the process to be completely seamless to users, and lastChangeType is
   * udpated to 'apply-entity' so that future keystrokes/changes are considered
   * boundary states for undo/redo.
   */
  return EditorState.set(editorState, {
    currentContent: newContentState,
    lastChangeType: 'apply-mention',
    selection: originalSelection,
  });
};

export default addImportedMention;
