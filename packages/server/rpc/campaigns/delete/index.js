const { method } = require('@bufferapp/buffer-rpc');
const post = require('../../../requestMethods/post');
const { handleError } = require('../../../utils');

module.exports = method(
  'deleteCampaign',
  'deletes an existing campaign',
  async ({ campaignId }, { session }) => {
    try {
      const response = await post({
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
