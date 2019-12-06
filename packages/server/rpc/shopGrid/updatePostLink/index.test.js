import updatePostLink from '.';

describe('rpc/updatePostLink', () => {
  it('should have the expected name', () => {
    expect(updatePostLink.name).toBe('updatePostLink');
  });

  it('should have the expected docs', () => {
    expect(updatePostLink.docs).toBe('update link for a post');
  });
});
