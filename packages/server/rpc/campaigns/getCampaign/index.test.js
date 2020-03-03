import RPCEndpoint from '.';

const get = require('../../../requestMethods/get');

jest.mock('../../../requestMethods/get');

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};

const params = {
  campaignId: '123456',
  past: true,
};

const geCampaign = () => RPCEndpoint.fn(params, { session });

const CAMPAIGN = {
  data: {
    id: '123456',
    _id: '123456',
    name: 'My campaign',
    color: '#BD3381',
    global_organization_id: '000111',
    created_at: 1583166077,
    updated_at: 1583166098,
    sent: 0,
    scheduled: 0,
  },
  success: true,
};

const CAMPAIGN_WITH_SCHEDULED_ITEMS = {
  data: {
    ...CAMPAIGN.data,
    scheduled: 2,
    sent: 1,
    start_date: 1583946000,
    end_date: 1583946000,
    items: [
      {
        id: '123',
        type: 'update',
        due_at: 1583946000,
        service_type: 'twitter',
        service_id: 96414483,
        channel_type: 'profile',
      },
      {
        id: '124',
        type: 'update',
        due_at: 1583946000,
        service_type: 'twitter',
        service_id: 96414483,
        channel_type: 'profile',
      },
    ],
  },
  success: true,
};

const CAMPAIGN_WITH_SENT_ITEMS = {
  data: {
    ...CAMPAIGN.data,
    scheduled: 2,
    sent: 1,
    start_date: 1583946000,
    end_date: 1583946000,
    items: [
      {
        id: '123',
        type: 'update',
        due_at: 1583946000,
        service_type: 'twitter',
        service_id: 96414483,
        channel_type: 'profile',
        service_post_id: '12345',
        sent_at: 1583946000,
      },
    ],
  },
  success: true,
};

describe('RPC | Get campaign', () => {
  it('gets the campaign without items correctly', async () => {
    get.mockReturnValueOnce(Promise.resolve(CAMPAIGN));
    await geCampaign().then(response => {
      expect(response.globalOrganizationId).toBe('000111');
      expect(response.name).toBe('My campaign');
      expect(response.color).toBe('#BD3381');
      expect(response.id).not.toBeNull();
      expect(response.id).not.toBeUndefined();
      expect(response.lastUpdated).toContain('Last updated ');
    });
  });

  it('gets the campaign with scheduled items correctly', async () => {
    get.mockReturnValueOnce(Promise.resolve(CAMPAIGN_WITH_SCHEDULED_ITEMS));
    await geCampaign().then(response => {
      expect(response.globalOrganizationId).toBe('000111');
      expect(response.name).toBe('My campaign');
      expect(response.color).toBe('#BD3381');
      expect(response.id).not.toBeUndefined();
      expect(response.dateRange).not.toBeUndefined();
      expect(response.lastUpdated).toContain('Last updated ');
      expect(response.items.length).toBe(2);
      response.items.forEach(item => {
        expect(item.dueAt).not.toBeUndefined();
        expect(item.serviceId).not.toBeUndefined();
        expect(item.serviceType).not.toBeUndefined();
        expect(item.channelType).not.toBeUndefined();
      });
    });
  });

  it('gets the campaign with scheduled items correctly', async () => {
    get.mockReturnValueOnce(Promise.resolve(CAMPAIGN_WITH_SENT_ITEMS));
    await geCampaign().then(response => {
      expect(response.globalOrganizationId).toBe('000111');
      expect(response.name).toBe('My campaign');
      expect(response.color).toBe('#BD3381');
      expect(response.id).not.toBeUndefined();
      expect(response.dateRange).not.toBeUndefined();
      expect(response.lastUpdated).toContain('Last updated ');
      expect(response.items.length).toBe(1);
      response.items.forEach(item => {
        expect(item.dueAt).not.toBeUndefined();
        expect(item.serviceId).not.toBeUndefined();
        expect(item.serviceType).not.toBeUndefined();
        expect(item.channelType).not.toBeUndefined();
        expect(item.servicePostId).not.toBeUndefined();
        expect(item.sentAt).not.toBeUndefined();
      });
    });
  });

  it('fails to get campaign', async () => {
    get.mockReturnValueOnce(Promise.reject(new TypeError('Error ocurred')));
    try {
      await geCampaign().then(response => {
        throw new TypeError(response);
      });
    } catch (err) {
      expect(err.message).toEqual('Error ocurred');
    }
  });
});
