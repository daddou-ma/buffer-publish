import { getRequestName } from './index';

describe('ProfilePage', () => {
  it('should export getRequestName', () => {
    expect(getRequestName).toBeDefined();
  });

  it('should return queue request name', () => {
    const queueRequestName = getRequestName('queue');
    expect(queueRequestName).toEqual('queuedPosts');
  });

  it('should return default request name', () => {
    const queueRequestName = getRequestName('other');
    expect(queueRequestName).toEqual('queuedPosts');
  });
});
