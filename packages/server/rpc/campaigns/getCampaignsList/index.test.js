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
  globalOrganizationId: '123',
};

const geCampaignsList = () => RPCEndpoint.fn(params, { session });

// eslint-disable-next-line import/prefer-default-export
export const CAMPAIGNS_LIST = {
  data: [
    {
      id: '2',
      _id: '2',
      global_organization_id: '123',
      name: 'Luna X Outdoorsy Launch',
      color: '#9C2BFF',
      start_date: 1603065600, // 'Oct 19-29, 2020',
      end_date: 1603929600,
      created_at: 1583625600,
      updated_at: 1583625600,
      scheduled: 8,
      sent: 0,
    },
    {
      id: '3',
      _id: '3',
      global_organization_id: '123',
      name: 'Awareness Day',
      color: '#9C2BFF',
      start_date: 1584921600, // 'March 23-April 4, 2020',
      end_date: 1585958400,
      created_at: 1583020800,
      updated_at: 1583020800,
      scheduled: 11,
      sent: 25,
    },
    {
      id: '1',
      _id: '1',
      global_organization_id: '123',
      name: '#SaveOurSeasWeek',
      color: '#9C2BFF',
      start_date: 1578182400, // 'Jan 5-18, 2020',
      end_date: 1579305600,
      created_at: 1577318400,
      updated_at: 1577318400,
      scheduled: 0,
      sent: 7,
    },
    {
      id: '4',
      _id: '4',
      global_organization_id: '123',
      name: 'New Year, New You',
      color: '#9C2BFF',
      start_date: 1577404800, // 'Dec 27 2019-Jan 7 2020',
      end_date: 1578355200,
      created_at: 1577923200,
      updated_at: 1577923200,
      scheduled: 7,
      sent: 1,
    },
  ],
};

describe('RPC | Get campaign list', () => {
  it('gets the campaigns list successfully', async () => {
    get.mockReturnValueOnce(Promise.resolve(CAMPAIGNS_LIST));
    await geCampaignsList().then(response => {
      response.forEach(campaign => {
        expect(campaign.globalOrganizationId).toBe('123');
        expect(campaign.dateRange).not.toBeUndefined();
        expect(campaign.lastUpdated).toContain('Last updated ');
      });
    });
  });
});
