const { method } = require('@bufferapp/buffer-rpc');
const { handleError } = require('../../../utils');

module.exports = method(
  'deleteCampaign',
  'deletes an existing campaign',
  async ({ campaignId }, { session }, res, { PublishAPI }) => {
    try {
      const response = await PublishAPI.post({
        uri: '1/campaigns/delete.json',
        session,
        params: {
          campaignId,
        },
      });
      return Promise.resolve(response);
    } catch (err) {
      handleError(err);
    }
  }
);
