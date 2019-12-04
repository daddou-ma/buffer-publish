/* Unshortenedlinks are annotated with UNSHORTENED_LINK entities */

const unshortenedLinkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'UNSHORTENED_LINK'
    );
  }, callback);
};

export default unshortenedLinkStrategy;
