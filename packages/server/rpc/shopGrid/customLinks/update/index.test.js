import update from '.';

describe('rpc/updateCustomLinks', () => {
  it('should have the expected name', () => {
    expect(update.name).toBe('updateCustomLinks');
  });

  it('should have the expected docs', () => {
    expect(update.docs).toBe('update custom links for a profile');
  });
});
