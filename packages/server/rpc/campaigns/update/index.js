const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'updateCampaign',
  'updates a campaign given the id',
  ({ campaignId, name, color }, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.post({
      uri: '1/campaigns/update.json',
      session,
      params: {
        campaign_id: campaignId,
        name,
        color,
      },
    })
      .then(response => parsers.campaignParser(response.data))
      .catch(PublishAPI.errorHandler)
);
