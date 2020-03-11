const { method } = require('@bufferapp/buffer-rpc');
const mockedData = require('./index.test.js');

module.exports = method(
  'getCampaignsList',
  'gets a list of campaigns, given the global organization id',
  (
    { globalOrganizationId },
    { session },
    res,
    { PublishAPI = { get: jest.fn() }, parsers }
  ) => {
    PublishAPI.get.mockResolvedValueOnce(mockedData.CAMPAIGNS_LIST);
    return PublishAPI.get({
      uri: `/1/campaigns.json`,
      session,
      params: { global_organization_id: globalOrganizationId },
    })
      .then(response => response.data.map(parsers.campaignParser))
      .catch(PublishAPI.errorHandler);
  }
);
