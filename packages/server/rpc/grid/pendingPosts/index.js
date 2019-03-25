const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'pendingPosts',
  'fetch pending posts for grid',
  ({ profileId, gridView }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/pending_thumbnails.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
      .then(result => JSON.parse(result))
      .then((parsedResult) => {
        const updates = parsedResult.map((post) => {
          return {
            thumbnail: post.thumbnail,
            buffered: post.buffered,
            due_at: parseInt(post.due_at.$date.$numberLong, 10),
          };
        });
        return {
          updates,
        };
      }),
);
