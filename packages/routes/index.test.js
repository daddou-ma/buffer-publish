import {
  getProfilePageParams,
  generateProfilePageRoute,
  generateChildTabRoute,
  preferencePageRoute,
  profilePageRoute,
  childTabRoute,
  generatePreferencePageRoute,
  getPreferencePageParams,
  getCampaignPageParams,
  getCampaignUrlMatch,
} from './index';

describe('publish-routes', () => {
  describe('getProfilePageParams', () => {
    it('should get params from path', () => {
      const profileId = '1234adf';
      const tabId = 'tabid123';
      const childTabId = 'childTab123';
      const path = `/profile/${profileId}/tab/${tabId}/${childTabId}`;
      expect(getProfilePageParams({ path })).toEqual({
        profileId,
        tabId,
        childTabId,
      });
    });

    it('should not get params from path with missing values', () => {
      const path = '/profile/';
      expect(getProfilePageParams({ path })).toBe(null);
    });
  });

  describe('generateProfilePageRoute', () => {
    it('should generate profile route', () => {
      const profileId = '1234adf';
      const tabId = 'tabid123';
      expect(
        generateProfilePageRoute({
          profileId,
          tabId,
        })
      ).toBe(`/profile/${profileId}/tab/${tabId}`);
    });
  });

  describe('generateChildTabRoute', () => {
    it('should generate profile route', () => {
      const profileId = '1234adf';
      const tabId = 'tabid123';
      const childTabId = 'childTab123';
      expect(
        generateChildTabRoute({
          profileId,
          tabId,
          childTabId,
        })
      ).toBe(`/profile/${profileId}/tab/${tabId}/${childTabId}`);
    });
  });

  describe('profilePageRoute', () => {
    it('should return profile page route template', () => {
      expect(profilePageRoute).toBe('/profile/:profileId/tab/:tabId');
    });
  });

  describe('childTabRoute', () => {
    it('should return child tab page route template', () => {
      expect(childTabRoute).toBe('/profile/:profileId/tab/:tabId/:childTabId');
    });
  });

  describe('preferencePageRoute', () => {
    it('should return a preferences page route template', () => {
      expect(preferencePageRoute).toBe('/preferences/:preferenceId');
    });
  });

  describe('generatePreferencePageRoute', () => {
    it('should generate preference page route', () => {
      const preferenceId = '1234adf';
      expect(
        generatePreferencePageRoute({
          preferenceId,
        })
      ).toBe(`/preferences/${preferenceId}`);
    });
  });

  describe('getPreferencePageParams', () => {
    it('should get params from path', () => {
      const preferenceId = '1234adf';
      const path = `/preferences/${preferenceId}`;
      expect(getPreferencePageParams({ path })).toEqual({
        preferenceId,
      });
    });
  });

  describe('getCampaignUrlMatch', () => {
    it('should get campaigns url match', () => {
      const campaignsPath = `/campaigns`;
      const match = getCampaignUrlMatch({ path: campaignsPath });
      expect(match[0]).toEqual('campaigns');
      expect(match[1]).toBeUndefined();
    });

    it('should get new campaign url match', () => {
      const createCampaignsPath = `/campaigns/new`;
      const match = getCampaignUrlMatch({ path: createCampaignsPath });
      expect(match[0]).toEqual('campaigns/new');
      expect(match[1]).toEqual('new');
    });

    it('should get scheduled campaign url match', () => {
      const viewCampaignPath = `/campaigns/123456/scheduled`;
      const match = getCampaignUrlMatch({ path: viewCampaignPath });
      expect(match[0]).toEqual('campaigns/123456/scheduled');
      expect(match[1]).toEqual('123456');
      expect(match[2]).toEqual('scheduled');
    });

    it('should get edit campaign url match', () => {
      const editCampaignPath = `/campaigns/123456/edit`;
      const match = getCampaignUrlMatch({ path: editCampaignPath });
      expect(match[0]).toEqual('campaigns/123456/edit');
      expect(match[1]).toEqual('123456');
      expect(match[2]).toEqual('edit');
    });
  });

  describe('getCampaignPageParams', () => {
    it('should return campaigns as page', () => {
      const path = '/campaigns';
      expect(getCampaignPageParams({ path })).toEqual({
        campaigns: 'campaigns',
        campaignId: undefined,
        campaignPage: 'campaigns',
      });
    });

    it('should return campaigns as page', () => {
      const path = '/campaigns/new';
      expect(getCampaignPageParams({ path })).toEqual({
        campaigns: 'campaigns/new',
        campaignId: null,
        campaignPage: 'new',
      });
    });

    it('should return scheduled as page if not in url', () => {
      const campaignId = '123456';
      const path = `/campaigns/${campaignId}`;
      expect(getCampaignPageParams({ path })).toEqual({
        campaigns: 'campaigns/123456',
        campaignId: '123456',
        campaignPage: 'scheduled',
      });
    });

    it('should return scheduled as page', () => {
      const campaignId = '123456';
      const path = `/campaigns/${campaignId}/scheduled`;
      expect(getCampaignPageParams({ path })).toEqual({
        campaigns: 'campaigns/123456/scheduled',
        campaignId: '123456',
        campaignPage: 'scheduled',
      });
    });

    it('should return sent as page', () => {
      const campaignId = '123456';
      const path = `/campaigns/${campaignId}/sent`;
      expect(getCampaignPageParams({ path })).toEqual({
        campaigns: 'campaigns/123456/sent',
        campaignId: '123456',
        campaignPage: 'sent',
      });
    });

    it('should return edit as page', () => {
      const campaignId = '123456';
      const path = `/campaigns/${campaignId}/edit`;
      expect(getCampaignPageParams({ path })).toEqual({
        campaigns: 'campaigns/123456/edit',
        campaignId: '123456',
        campaignPage: 'edit',
      });
    });
  });
});
