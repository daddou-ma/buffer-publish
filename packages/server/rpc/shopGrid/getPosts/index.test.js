import getPosts from '.';

describe('rpc/gridPosts', () => {
  it('should have the expected name', () => {
    expect(getPosts.name).toBe('gridPosts');
  });

  it('should have the expected docs', () => {
    expect(getPosts.docs).toBe('fetch service posts');
  });
});
