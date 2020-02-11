const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'awesomeToProUpgradeDetails',
  'fetch upgrade details for awesome users migrating to pro',
  (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/awesome_to_pro_upgrade_details.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
      },
    }).then(result => JSON.parse(result))
);
