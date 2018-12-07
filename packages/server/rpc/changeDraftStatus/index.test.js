import changeDraftStatus from './';

describe('rpc/changeDraftStatus', () => {
  it('should have the expected name', () => {
    expect(changeDraftStatus.name).toBe('changeDraftStatus');
  });

  it('should have the expected docs', () => {
    expect(changeDraftStatus.docs).toBe('request approval or move to drafts');
  });
});
