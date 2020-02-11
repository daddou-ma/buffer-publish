const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'updateCampaign',
  'updates a campaign given the id',
  async ({ campaignId, name, color }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/campaigns/update.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          campaign_id: campaignId,
          name,
          color,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw createError({ message });
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result.data);
  }
);
