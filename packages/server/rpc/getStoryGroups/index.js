const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { storyGroupParser } = require('./../../parsers/src');
const { buildPostMap } = require('./../../formatters/src');

module.exports = method(
  'getStoryGroups',
  'fetch stories groups',
  ({ profileId, since, before, utc = false }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/story_groups/pending.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        since,
        before,
        utc,
        count: 100,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => {
        const updates = parsedResult.data.map(storyGroupParser);
        const mappedUpdates = buildPostMap(updates);
        return {
          total: parsedResult.total,
          updates: mappedUpdates,
        };
      })
);
