const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { buildPostMap } = require('./../../../formatters/src');

module.exports = method(
  'gridPosts',
  'fetch service posts',
  ({ profileId }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/grid.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => {
        const updates = parsedResult.map(post => {
          return {
            id: post.id,
            thumbnail: post.thumbnail,
            scheduled: post.scheduled,
            due_at: post.due_at,
            sent_at: post.sent_at,
            link: post.link,
          };
        });
        const mappedUpdates = buildPostMap(updates);
        return {
          updates: mappedUpdates,
        };
      })
);
