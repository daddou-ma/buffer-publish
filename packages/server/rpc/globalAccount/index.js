const { method } = require('@bufferapp/buffer-rpc');
const authenticationService = require('../../services/authenticationService');

const getGlobalUser = accountId =>
  authenticationService.getAccount({ accountId });
//
module.exports = method(
  'globalAccount',
  'fetch global account data',
  async (_, req) => getGlobalUser(req.session.global.accountId),
);
