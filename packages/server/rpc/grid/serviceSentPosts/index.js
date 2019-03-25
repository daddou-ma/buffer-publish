const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'servicePosts',
  'fetch service posts',
  ({ profileId, gridView }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/service_posts.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        grid_view: gridView,
      },
    })
    .then(result => JSON.parse(result))
    .then((parsedResult) => {
      const updates = parsedResult.updates.map((post) => {
        return {
          thumbnail: post.thumbnail,
          buffered: post.buffered,
          due_at: post.due_at * 1000,
        };
      });
      return {
        updates,
      };
    }),
);
