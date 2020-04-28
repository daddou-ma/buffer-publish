const { method } = require('@bufferapp/buffer-rpc');
const { isImpersonation } = require('@bufferapp/session-manager');
const authenticationService = require('../../services/authenticationService');

module.exports = method(
  'globalAccount',
  'fetch global account data',
  async (_, req) => {
    // Get the global account based on the publish session data
    // because that's the only session key updated during impersonation
    const publishId = req.session.publish.foreignKey;
    const account = await authenticationService.getAccountForPublishId({
      publishId,
    });

    try {
      const organization = await authenticationService.getOrganization({
        adminAccountId: account._id,
      });
      if (organization) {
        account.productSolutionName =
          organization.metadata &&
          organization.metadata.account &&
          organization.metadata.account.productSolutionName;
      }
    } catch (e) {
      console.log(e); // eslint-disable-line no-console
    }

    account.isImpersonation = isImpersonation(req.session);

    return account;
  }
);
