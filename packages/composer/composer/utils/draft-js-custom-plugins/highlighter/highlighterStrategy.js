const highlighterStrategy = (
  draft,
  getDraftCharacterCount,
  store,
  contentBlock,
  callback
) => {
  const charLimit = draft.service.charLimit;
  const characterCount = getDraftCharacterCount(
    draft.id,
    contentBlock.getText()
  );

  const charsAboveLimit = characterCount - charLimit;
  if (charsAboveLimit <= 0) return;

  const blockLength = contentBlock.getLength();
  const startOffset = blockLength - charsAboveLimit;
  const endOffset = blockLength;

  callback(startOffset, endOffset);
};

export default highlighterStrategy;
