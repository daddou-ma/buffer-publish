const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'connectedApps',
  'fetch connected apps',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/apps.json`,
      method: 'GET',
      strictSSL: !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ),
      qs: {
        access_token: session.publish.accessToken,
      },
    }).then(result => JSON.parse(result))
);
