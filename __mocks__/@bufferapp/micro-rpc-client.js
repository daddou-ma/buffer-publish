const RPCClient = jest.genMockFromModule('@bufferapp/micro-rpc-client');
RPCClient.fakeResult = { fake: 'yes' };
RPCClient.fakeError = 'there was an error';

RPCClient.prototype.call = jest.fn(name => {
  if (name === 'create') {
    return Promise.resolve({
      token: 'someSessionToken',
    });
  }
  if (name === 'destroy') {
    return Promise.resolve();
  }
  if (name === 'fail') {
    return Promise.reject(new Error(RPCClient.fakeError));
  }

  return Promise.resolve(RPCClient.fakeResult);
});

module.exports = RPCClient;
