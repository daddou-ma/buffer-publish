import { EditorState, Modifier, SelectionState } from '@bufferapp/draft-js';

/**
 * Remove all Facebook Autocomplete entities from the editorState.
 * Currently used when copying a draft's contents to another that doesn't support
 * Facebook entities.
 */
const removeFacebookAutocompleteEntities = function(editorState) {
  let contentState = editorState.getCurrentContent();
  const originalSelectionBefore = contentState.getSelectionBefore();
  const originalSelection = editorState.getSelection();

  const filterFacebookAutocompleteEntities = characterMetadata => {
    const entityKey = characterMetadata.getEntity();
    if (entityKey === null) return false;

    const entityType = contentState.getEntity(entityKey).getType();
    return entityType === 'mention' || entityType === 'IMPORTED_MENTION';
  };

  contentState.getBlockMap().forEach(contentBlock => {
    const blockKey = contentBlock.getKey();

    contentBlock.findEntityRanges(
      filterFacebookAutocompleteEntities,
      (start, end) => {
        contentState = Modifier.applyEntity(
          contentState,
          new SelectionState({
            anchorKey: blockKey,
            anchorOffset: start,
            focusKey: blockKey,
            focusOffset: end,
          }),
          null
        );
      }
    );
  });

  /**
   * Set selectionBefore/After back to what they were before they were changed
   * by Modifier.applyEntity for proper undo/redo behavior.
   */
  contentState = contentState.merge({
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
    currentContent: contentState,
    lastChangeType: 'apply-hashtag',
    selection: originalSelection,
  });
};

export default removeFacebookAutocompleteEntities;
