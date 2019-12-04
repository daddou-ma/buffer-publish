const RPCClient = require('micro-rpc-client');

const client = process.env.AUTH_SVC_ADDR
  ? new RPCClient({ url: `${process.env.AUTH_SVC_ADDR}/rpc` })
  : new RPCClient({ url: 'https://authentication-service-dev.core-dev' });

module.exports = {
  getAccount: ({ accountId }) => client.call('getAccount', { _id: accountId }),
  getOrganization: ({ adminAccountId }) =>
    client.call('getOrganization', { adminAccountId }),
};
