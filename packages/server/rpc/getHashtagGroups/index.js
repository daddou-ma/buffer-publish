const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'hashtagGroups',
  'fetch hashtag groups',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/snippet_groups.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
      qs: {
        access_token: session.publish.accessToken,
        organization_id: session.publish.accessToken,
      },
    })
    .then(result => JSON.parse(result)),
);
