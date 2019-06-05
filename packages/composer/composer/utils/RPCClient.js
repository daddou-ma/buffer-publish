import RPCClient from 'micro-rpc-client';

const rpc = new RPCClient({
  url: '/rpc',
  sendCredentials: 'same-origin',
});

export default rpc;
