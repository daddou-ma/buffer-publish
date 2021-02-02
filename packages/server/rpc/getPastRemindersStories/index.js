const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { storyGroupParser } = require('./../../parsers');
const { buildPostMap } = require('./../../formatters');

module.exports = method(
  'getPastRemindersStories',
  'fetch past reminders stories',
  ({ profileId, page }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/story_groups/notifications.json`,
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
        const updates = parsedResult.notifications.map(storyGroupParser);
        const mappedUpdates = buildPostMap(updates);
        return {
          total: parsedResult.total,
          updates: mappedUpdates,
        };
      })
);
