import { middleware } from './index';

describe('Pusher Sync', () => {
  it('should export middleware', () => {
    expect(middleware).toBeDefined();
  });
});
