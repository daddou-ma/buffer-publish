const hashtagRegex = require('hashtag-regex');

const countHashtagsInText = text => {
  let counter = 0;

  const regex = hashtagRegex();

  while (regex.exec(text)) {
    counter += 1;
  }
  return counter;
};

export default countHashtagsInText;
