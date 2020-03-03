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

const CAMPAIGN_WITH_ITEMS = {
  data: {
    ...CAMPAIGN.data,
    scheduled: 1,
    start_date: 1583946000,
    end_date: 1583946000,
  },
  success: true,
};

describe('RPC | Get campaign', () => {
  it('gets the campaign without items correctly', async () => {
    get.mockReturnValueOnce(Promise.resolve(CAMPAIGN));
    await geCampaign().then(response => {
      expect(response.name).toBe('My campaign');
      expect(response.id).not.toBeNull();
    });
  });

  it('gets the campaign with items correctly', async () => {
    get.mockReturnValueOnce(Promise.resolve(CAMPAIGN_WITH_ITEMS));
    await geCampaign().then(response => {
      expect(response.name).toBe('My campaign');
      expect(response.id).not.toBeNull();
      expect(response.startDate).not.toBeNull();
      expect(response.endDate).not.toBeNull();
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
