/* Shortlinks are annotated with SHORT_LINK entities */

const shortLinkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'SHORT_LINK'
    );
  }, callback);
};

export default shortLinkStrategy;
