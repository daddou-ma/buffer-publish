const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'createCampaign',
  'create a new campaign given an organization id',
  async ({ name, color, organizationId }, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/campaigns/create.json`,
        method: 'POST',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        form: {
          access_token: session.publish.accessToken,
          name,
          color,
          organization_id: organizationId,
        },
      });
    } catch (err) {
      if (err.error) {
        const { message } = JSON.parse(err.error);
        throw createError({ message });
      }
      throw err;
    }
    result = JSON.parse(result);
    return Promise.resolve(result.data);
  }
);
