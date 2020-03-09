const { method } = require('@bufferapp/buffer-rpc');
const { campaignParser } = require('../../../parsers/src');
const { handleError } = require('../../../utils');
const get = require('../../../requestMethods/get');
const mockedData = require('./index.test.js');

const processResponse = response => {
  return response.data.map(campaignParser);
};

module.exports = method(
  'getCampaignsList',
  'gets a list of campaigns, given the global organization id',
  async ({ globalOrganizationId }, { session }) => {
    const uri = `/1/campaigns.json`;
    try {
      const response = await get({
        uri,
        session,
        params: { global_organization_id: globalOrganizationId },
      });
      const result = processResponse(mockedData.CAMPAIGNS_LIST);
      return Promise.resolve(result);
    } catch (err) {
      handleError(err);
    }
  }
);
