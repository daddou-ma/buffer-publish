import approveDraft from './';

describe('rpc/approveDraft', () => {
  it('should have the expected name', () => {
    expect(approveDraft.name).toBe('approveDraft');
  });

  it('should have the expected docs', () => {
    expect(approveDraft.docs).toBe('approve and move draft to queue');
  });
});
