const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'getCampaignsList',
  'gets a list of campaigns, given the global organization id',
  ({ globalOrganizationId }, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.get({
      uri: `/1/campaigns.json`,
      session,
      params: { global_organization_id: globalOrganizationId },
    })
      .then(response => response.data.map(parsers.campaignParser))
      .catch(PublishAPI.errorHandler)
);
