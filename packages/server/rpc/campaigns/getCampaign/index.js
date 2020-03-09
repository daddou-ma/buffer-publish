const { method } = require('@bufferapp/buffer-rpc');
const { campaignParser } = require('../../../parsers/src');
const { handleError } = require('../../../utils');

const processResponse = response => {
  return campaignParser(response.data);
};

module.exports = method(
  'getCampaign',
  'gets a single campaign, given the id',
  async (
    { campaignId, past, basicItems },
    { session },
    res,
    { PublishAPI }
  ) => {
    try {
      const response = await PublishAPI.get({
        uri: `/1/campaigns/${campaignId}.json`,
        session,
        params: { past, basic_items: basicItems },
      });
      const result = processResponse(response);
      return Promise.resolve(result);
    } catch (err) {
      handleError(err);
    }
  }
);
