import draftPosts from './';

describe('rpc/draftPosts', () => {
  it('should have the expected name', () => {
    expect(draftPosts.name).toBe('draftPosts');
  });

  it('should have the expected docs', () => {
    expect(draftPosts.docs).toBe('fetch posts with status set as draft');
  });
});
