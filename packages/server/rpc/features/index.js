const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { featureParser } = require('./../../parsers/src');

module.exports = method(
  'features',
  'fetch user features for plan',
  async (_, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/user/features.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.publish.accessToken,
        includes: 'avatar',
      },
    }).then(result => {
      const featureData = JSON.parse(result);
      return featureParser(featureData);
    })
);
