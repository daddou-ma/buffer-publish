const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'intercom',
  'fetch intercom data for user',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/intercom.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    }).then(result => JSON.parse(result))
);
