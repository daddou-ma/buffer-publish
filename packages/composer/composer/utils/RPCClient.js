import RPCClient from '@bufferapp/micro-rpc-client';

const rpc = new RPCClient({
  url: '/rpc',
  sendCredentials: 'same-origin',
});

export default rpc;
