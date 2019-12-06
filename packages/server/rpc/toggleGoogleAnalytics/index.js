const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'toggleGoogleAnalytics',
  'toggle google analytics',
  async ({ profileId, utmTrackingChoice }, { session }) => {
    let request;
    try {
      request = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/utm_tracking/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
          allow_utm_tracking: utmTrackingChoice,
        },
      })
        .then(result => JSON.parse(result))
        .then(result => ({
          isEnabled: result.utm_tracking,
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
