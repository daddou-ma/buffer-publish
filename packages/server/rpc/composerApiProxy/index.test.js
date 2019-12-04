/* eslint-disable import/first */
import composerApiProxy from './';

describe('rpc/apiWrapper', () => {
  it('should have the expected name', () => {
    expect(composerApiProxy.name).toBe('composerApiProxy');
  });
});
