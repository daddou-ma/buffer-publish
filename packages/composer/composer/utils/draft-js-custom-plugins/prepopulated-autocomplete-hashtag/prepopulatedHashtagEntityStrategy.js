const prepopulatedHashtagEntityStrategy = (
  contentBlock,
  callback,
  contentState
) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'PREPOPULATED_HASHTAG'
    );
  }, callback);
};

export default prepopulatedHashtagEntityStrategy;
