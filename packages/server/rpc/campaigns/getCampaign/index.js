const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'getCampaign',
  'gets a single campaign, given the id',
  (
    { campaignId, past, fullItems },
    { session },
    res,
    { PublishAPI, parsers }
  ) =>
    PublishAPI.get({
      uri: `/1/campaigns/${campaignId}.json`,
      session,
      params: { past, full_items: fullItems },
    })
      .then(response => parsers.campaignParser(response.data))
      .catch(PublishAPI.errorHandler)
);
