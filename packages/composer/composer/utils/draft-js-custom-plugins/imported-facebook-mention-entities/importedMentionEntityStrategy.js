const importedMentionEntityStrategy = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'IMPORTED_MENTION'
    );
  }, callback);
};

export default importedMentionEntityStrategy;
