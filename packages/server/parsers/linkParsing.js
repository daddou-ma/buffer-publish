const twitter = require('twitter-text');

const makeUnicodeAwareIndexUnaware = (str, i) =>
  Array.from(str)
    .slice(0, i)
    .join('').length;

module.exports = {
  parseFacebookEntities: (postText, entities) => {
    if (!entities) return [];

    return entities.map(({ url, text, indices }) => ({
      displayString: text,
      indices: [
        makeUnicodeAwareIndexUnaware(postText, indices[0]),
        makeUnicodeAwareIndexUnaware(postText, indices[1]),
      ],
      rawString: text,
      url,
    }));
  },
  parseTwitterLinks: text =>
    twitter
      .extractEntitiesWithIndices(text)
      .map(entity => {
        if (entity.url) {
          return {
            displayString: entity.url,
            indices: entity.indices,
            rawString: entity.url,
            url: entity.url,
          };
        }
        if (entity.hashtag) {
          return {
            displayString: `#${entity.hashtag}`,
            indices: entity.indices,
            rawString: `#${entity.hashtag}`,
            url: `https://twitter.com/#!/search?q=%23${entity.hashtag}`,
          };
        }
        if (entity.screenName) {
          return {
            displayString: `@${entity.screenName}`,
            indices: entity.indices,
            rawString: `@${entity.screenName}`,
            url: `https://twitter.com/${entity.screenName}`,
          };
        }
        if (entity.cashtag) {
          return {
            displayString: `$${entity.cashtag}`,
            indices: entity.indices,
            rawString: `$${entity.cashtag}`,
            url: `https://twitter.com/#!/search?q=%24${entity.cashtag}`,
          };
        }
        return null;
      })
      .filter(entity => entity !== null),
};
