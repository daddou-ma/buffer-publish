const HASHTAG_REGEX = /(\s|^)#[\w]*/g;

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr;
  let start;

  while ((matchArr = regex.exec(text)) !== null) {
    // eslint-disable-line
    const isPaddedBySpace = matchArr[1].length > 0;
    start = matchArr.index + (isPaddedBySpace ? 1 : 0);

    // The hashtag plugin doesn't use entities: only match hashtags that don't
    // have any entities attached
    const isOtherEntity = contentBlock.getEntityAt(start) !== null;
    if (!isOtherEntity) callback(start, matchArr.index + matchArr[0].length);
  }
};

const hashtagStrategy = (contentBlock, callback) => {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
};

export default hashtagStrategy;
export { HASHTAG_REGEX };
