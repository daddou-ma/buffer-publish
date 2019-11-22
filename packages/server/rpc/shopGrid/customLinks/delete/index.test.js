import * as deleteCustomLink from '.';

describe('rpc/deleteCustomLink', () => {
  it('should have the expected name', () => {
    expect(deleteCustomLink.name).toBe('deleteCustomLink');
  });

  it('should have the expected docs', () => {
    expect(deleteCustomLink.docs).toBe('delete custom link for profile');
  });
});
