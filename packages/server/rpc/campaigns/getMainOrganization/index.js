const { method, createError } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');

module.exports = method(
  'getMainOrganization',
  'gets main organization for logged user',
  async (_, { session }) => {
    let result;
    try {
      result = await rp({
        uri: `${process.env.API_ADDR}/1/campaigns/user_main_organization.json`,
        method: 'GET',
        strictSSL: !(process.env.NODE_ENV === 'development'),
        qs: {
          access_token: session.publish.accessToken,
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
    result.mainOrganization = result.data.main_organization;
    result.isOrgAdmin = result.data.is_org_admin;
    return Promise.resolve(result);
  }
);
