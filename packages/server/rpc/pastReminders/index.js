const { postParser } = require('@bufferapp/publish-parsers');
const { buildPostMap } = require('@bufferapp/publish-formatters');
const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'pastReminders',
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
      .then((parsedResult) => {
        const updates = parsedResult.notifications.map(postParser);
        const mappedUpdates = buildPostMap(updates);
        return {
          total: parsedResult.total,
          updates: mappedUpdates,
        };
      }),
);
