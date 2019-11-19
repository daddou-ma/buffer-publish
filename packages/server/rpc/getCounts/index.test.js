import getCounts from '.';

describe('rpc/getCounts', () => {
  it('should have the expected name', () => {
    expect(getCounts.name).toBe('getCounts');
  });

  it('should have the expected docs', () => {
    expect(getCounts.docs).toBe('get counts');
  });
});
