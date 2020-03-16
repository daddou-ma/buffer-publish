const { method } = require('@bufferapp/buffer-rpc');

module.exports = method(
  'createCampaign',
  'create a new campaign',
  ({ name, color }, { session }, res, { PublishAPI, parsers }) =>
    PublishAPI.post({
      uri: '1/campaigns/create.json',
      session,
      params: {
        name,
        color,
      },
    })
      .then(response => parsers.campaignParser(response.data))
      .catch(PublishAPI.errorHandler)
);
