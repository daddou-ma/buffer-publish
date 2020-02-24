const { method } = require('@bufferapp/buffer-rpc');
const { handleError } = require('../../../utils');
const get = require('../../../requestMethods/get');

const processResponse = response => {
  const result = {};
  result.mainOrganization = response.data.main_organization;
  result.isOrgAdmin = response.data.is_org_admin;

  return result;
};

module.exports = method(
  'getMainOrganization',
  'gets main organization for logged user',
  async (_, { session }) => {
    const uri = '1/campaigns/user_main_organization.json';
    try {
      const response = await get({ uri, session });
      const result = processResponse(response);
      return Promise.resolve(result);
    } catch (err) {
      handleError(err);
    }
  }
);
