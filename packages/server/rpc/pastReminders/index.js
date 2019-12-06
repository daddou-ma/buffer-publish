const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { postParser } = require('./../../parsers/src');
const { buildPostMap } = require('./../../formatters/src');

module.exports = method(
  'pastRemindersPosts',
  'fetch past reminders',
  ({ profileId, page }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/notifications.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        page,
        count: 20,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => {
        const updates = parsedResult.notifications.map(postParser);
        const mappedUpdates = buildPostMap(updates);
        return {
          total: parsedResult.total,
          updates: mappedUpdates,
        };
      })
);
