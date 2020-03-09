const { method } = require('@bufferapp/buffer-rpc');
const { campaignParser } = require('../../../parsers/src');
const post = require('../../../publishAPI/post');
const { handleError } = require('../../../utils');

const processResponse = response => {
  return campaignParser(response.data);
};

module.exports = method(
  'updateCampaign',
  'updates a campaign given the id',
  async ({ campaignId, name, color }, { session }) => {
    try {
      const response = await post({
        uri: '1/campaigns/update.json',
        session,
        params: {
          campaign_id: campaignId,
          name,
          color,
        },
      });
      const campaign = processResponse(response);
      return Promise.resolve(campaign);
    } catch (err) {
      handleError(err);
    }
  }
);
