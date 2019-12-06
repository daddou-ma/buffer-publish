const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'getGATrackingSettings',
  'get GA tracking settings',
  async ({ profileId }, { session }) => {
    let request;
    try {
      request = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/utm_tracking/utm_get_custom_values.json`,
        method: 'GET',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
        },
      })
        .then(result => JSON.parse(result))
        .then(result => ({
          trackingSettings: result,
        }));
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw new Error(message);
      }
      throw err;
    }
    return request;
  }
);
