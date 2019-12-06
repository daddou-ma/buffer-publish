import { getPageNameFromPath } from './Pathname';

describe('Pathname Utils', () => {
  describe('returns correct page name from path', () => {
    it('returns plans page name', () => {
      const pathname = '/plans';
      const pageName = getPageNameFromPath(pathname);
      expect(pageName).toEqual('plans');
    });
    it('returns preferences with sub page name', () => {
      const pathname = '/preferences/security';
      const pageName = getPageNameFromPath(pathname);
      expect(pageName).toEqual('preferences security');
    });
    it('returns queue page name', () => {
      const pathname = '/profile/5d48a8bde5fbe90008026905/tab/queue';
      const pageName = getPageNameFromPath(pathname);
      expect(pageName).toEqual('queue');
    });
    it('returns analytics with sub page name', () => {
      const pathname =
        '/profile/5d48a8bde5fbe90008026905/tab/analytics/overview';
      const pageName = getPageNameFromPath(pathname);
      expect(pageName).toEqual('analytics overview');
    });
    it('returns analytics with default subname if no subname', () => {
      const pathname = '/profile/5d48a8bde5fbe90008026905/tab/analytics';
      const pageName = getPageNameFromPath(pathname);
      expect(pageName).toEqual('analytics posts');
    });
    it('returns null if pathname is not valid', () => {
      const pathname = '/test/test/test';
      const pageName = getPageNameFromPath(pathname);
      expect(pageName).toEqual(pathname);
    });
  });
});
