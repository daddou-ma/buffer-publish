const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'getCounts',
  'get counts',
  ({ profileId }, { session }) => {
    return rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/counts.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
      .then(result => JSON.parse(result))
      .then(result => ({
        counts: result,
      }));
  }
);
