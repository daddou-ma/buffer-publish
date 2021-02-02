const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { postParser } = require('./../../parsers');
const { buildPostMap } = require('./../../formatters');

module.exports = method(
  'shuffleQueue',
  'shuffle posts in the queue',
  ({ profileId, count }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/shuffle.json`,
      method: 'POST',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      form: {
        access_token: session.publish.accessToken,
        count,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => {
        const updates = parsedResult.updates.map(postParser);
        const mappedUpdates = buildPostMap(updates);
        return {
          total: parsedResult.total,
          updates: mappedUpdates,
        };
      })
);
