const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'deleteCampaign',
  'deletes an existing campaign',
  ({ campaignId }, { session }, res, { PublishAPI }) =>
    PublishAPI.post({
      uri: '1/campaigns/delete.json',
      session,
      params: {
        campaignId,
      },
    }).catch(PublishAPI.errorHandler)
);
