const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const { campaignParser } = require('../../../parsers/src');

module.exports = method(
  'getCampaign',
  'gets a single campaign, given the id',
  async ({ campaignId, past }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/campaigns/${campaignId}.json`,
        method: 'GET',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
          past,
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
    const campaign = campaignParser(result.data);
    return Promise.resolve(campaign);
  }
);
