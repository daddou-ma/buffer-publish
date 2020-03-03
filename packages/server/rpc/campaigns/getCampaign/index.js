const { method } = require('@bufferapp/buffer-rpc');
const { campaignParser } = require('../../../parsers/src');
const { handleError } = require('../../../utils');
const get = require('../../../requestMethods/get');

const processResponse = response => {
  return campaignParser(response.data);
};

module.exports = method(
  'getCampaign',
  'gets a single campaign, given the id',
  async ({ campaignId, past }, { session }) => {
    const uri = `/1/campaigns/${campaignId}.json`;
    try {
      const response = await get({ uri, session, params: { past } });
      const result = processResponse(response);
      return Promise.resolve(result);
    } catch (err) {
      handleError(err);
    }
  }
);
