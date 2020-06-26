import RPCClient from '@bufferapp/micro-rpc-client';

/**
 * When called this method will spy on and mock calls to RPC methods.
 *
 * Usage:
 *
 */
export default mockedResponses => {
  const mockFns = Object.entries(mockedResponses).reduce((obj, item) => {
    obj[item[0]] = jest.fn(() => item[1]);
    return obj;
  });
  jest
    .spyOn(RPCClient.prototype, 'call')
    .mockImplementation((name, ...args) => {
      console.log('rpc call', name);
      if (mockFns[name]) {
        return Promise.resolve(mockFns[name](...args));
      }
      return Promise.resolve(mockFns.default(...args));
    });
  return mockFns;
};
