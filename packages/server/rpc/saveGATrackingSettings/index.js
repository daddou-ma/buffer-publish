const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'saveGATrackingSettings',
  'save GA tracking settings',
  async ({ profileId, utmCampaign, utmSource, utmMedium }, { session }) => {
    let request;
    try {
      request = await rp({
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/utm_tracking/update_utm.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
          utm_campaign: utmCampaign,
          utm_source: utmSource,
          utm_medium: utmMedium,
        },
      })
        .then(result => JSON.parse(result))
        .then(result => ({
          showNotification: true,
          message: result.notice_message,
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
