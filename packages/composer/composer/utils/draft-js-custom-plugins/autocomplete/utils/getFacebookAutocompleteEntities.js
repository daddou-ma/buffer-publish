import { getUnicodeAwareLength } from '../../../../utils/StringUtils';

/**
 * Retrieve Facebook Autocomplete entities from the editor's contents.
 * The returned indices are unicode-aware.
 */
const getFacebookAutocompleteEntities = function(editorState) {
  const entities = [];
  let entitiesBlockOffset = 0;

  const contentState = editorState.getCurrentContent();

  const filterFacebookAutocompleteEntities = characterMetadata => {
    const entityKey = characterMetadata.getEntity();
    if (entityKey === null) return false;

    const entityType = contentState.getEntity(entityKey).getType();
    return entityType === 'mention' || entityType === 'IMPORTED_MENTION';
  };

  contentState.getBlockMap().forEach(contentBlock => {
    contentBlock.findEntityRanges(
      filterFacebookAutocompleteEntities,
      (start, end) => {
        const entityKey = contentBlock.getEntityAt(start);
        const mention = contentState.getEntity(entityKey).getData().mention;

        const leftHandText = contentBlock.getText().slice(0, start);
        const entitiesInlineOffset =
          getUnicodeAwareLength(leftHandText) - leftHandText.length;

        entities.push({
          indices: [
            entitiesBlockOffset + entitiesInlineOffset + start,
            entitiesBlockOffset + entitiesInlineOffset + end,
          ],
          content: mention.get('id'),
          text: mention.get('name'),
          url: mention.get('url'),
        });
      }
    );

    entitiesBlockOffset += getUnicodeAwareLength(contentBlock.getText()) + 1;
  });

  return entities;
};

export default getFacebookAutocompleteEntities;
