import { getProfilesParams, getParams, getMatch } from './index';

describe('publish-routes', () => {
  describe('getProfilesParams', () => {
    it('should get params from path', () => {
      const profileId = '1234adf';
      const tabId = 'tabid123';
      const childTabId = 'childTab123';
      const pathname = '/profile/1234adf/tab/tabid123/childTab123';
      expect(getProfilesParams({ pathname })).toEqual({
        profileId,
        tabId,
        childTabId,
      });
    });

    it('should not get params from path with missing values', () => {
      const pathname = '/profile/';
      expect(getProfilesParams({ pathname })).toBe(null);
    });
  });

  describe('getMatch from matching route', () => {
    it('returns details from path', () => {
      const pathname = '/campaigns/id1/scheduled';
      const route = '/campaigns/:id/scheduled/';
      const pathDetails = {
        isExact: true,
        params: {
          id: 'id1',
        },
        path: route,
        url: pathname,
      };
      expect(getMatch({ pathname, route })).toEqual(pathDetails);
    });
    it('returns null if path does not match route', () => {
      const pathname = '/campaigns/scheduled';
      const route = '/campaigns/:id/scheduled/';
      expect(getMatch({ pathname, route })).toEqual(null);
    });
  });

  describe('getParams from matching route', () => {
    it('returns id params from path', () => {
      const pathname = '/campaigns/id1/scheduled';
      const route = '/campaigns/:id/scheduled/';
      expect(getParams({ pathname, route })).toEqual({ id: 'id1' });
    });
    it('returns null if path does not match route', () => {
      const pathname = '/campaigns/scheduled';
      const route = '/campaigns/:id/scheduled/';
      expect(getParams({ pathname, route })).toEqual(null);
    });
  });
});
