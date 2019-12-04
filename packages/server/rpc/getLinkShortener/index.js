const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'getLinkShortener',
  'get link shortener',
  ({ profileId }, { session }) => {
    return rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/shorteners.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    })
      .then(result => JSON.parse(result))
      .then(result => ({
        linkShorteners: result,
      }));
  }
);
