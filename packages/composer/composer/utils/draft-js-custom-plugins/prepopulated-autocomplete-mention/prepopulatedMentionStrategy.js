const MENTION_REGEX = /(\s|^)@[\w]*/g;

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr;
  let start;

  while ((matchArr = regex.exec(text)) !== null) {
    // eslint-disable-line
    const isPaddedBySpace = matchArr[1].length > 0;
    start = matchArr.index + (isPaddedBySpace ? 1 : 0);
    callback(start, matchArr.index + matchArr[0].length);
  }
};

const prepopulatedMentionStrategy = (contentBlock, callback) => {
  findWithRegex(MENTION_REGEX, contentBlock, callback);
};

export default prepopulatedMentionStrategy;
