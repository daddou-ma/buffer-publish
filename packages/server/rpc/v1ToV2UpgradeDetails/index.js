const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'v1ToV2UpgradeDetails',
  'fetch upgrade to business v2 details',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/v1_v2_upgrade_details.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    }).then(result => JSON.parse(result))
);
