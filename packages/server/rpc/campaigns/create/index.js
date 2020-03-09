const { method } = require('@bufferapp/buffer-rpc');
const { campaignParser } = require('../../../parsers/src');
const { handleError } = require('../../../utils');

const processResponse = response => {
  return campaignParser(response.data);
};

module.exports = method(
  'createCampaign',
  'create a new campaign',
  async ({ name, color }, { session }, res, { PublishAPI }) => {
    try {
      const response = await PublishAPI.post({
        uri: '1/campaigns/create.json',
        session,
        params: {
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
