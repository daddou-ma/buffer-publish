// Using OLD client (see comment below)
const RPCClient = require('micro-rpc-client');

/*
 * @todo: Switch to the line below when the authentication-service supports RPC calls
 * with the method name in the URI. (i.e., when they upgrade to `buffer-rpc` >= 1.0.0)
 */
// const RPCClient = require('@bufferapp/micro-rpc-client');

const client = process.env.AUTH_SVC_ADDR
  ? new RPCClient({ url: `${process.env.AUTH_SVC_ADDR}/rpc` })
  : new RPCClient({ url: 'https://authentication-service-dev.core-dev' });

module.exports = {
  getAccount: ({ accountId }) => client.call('getAccount', { _id: accountId }),
  getAccountForPublishId: ({ publishId }) =>
    client.call('getAccount', {
      productName: 'publish',
      foreignKey: publishId,
    }),
  getOrganization: ({ adminAccountId }) =>
    client.call('getOrganization', { adminAccountId }),
};
