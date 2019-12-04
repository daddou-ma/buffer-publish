const { method } = require('@bufferapp/buffer-rpc');
const authenticationService = require('../../services/authenticationService');

const getGlobalUser = accountId =>
  authenticationService.getAccount({ accountId });
//
module.exports = method(
  'globalAccount',
  'fetch global account data',
  async (_, req) => {
    const user = await getGlobalUser(req.session.global.accountId);
    try {
      const organization = await authenticationService.getOrganization({
        adminAccountId: req.session.global.accountId,
      });
      if (organization) {
        user.isAnalyzePublishBundle =
          organization.metadata.account.isAnalyzePublishBundle;
      }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }
    return user;
  }
);
