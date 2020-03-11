import RPCEndpoint from '.';
import parsers from '../../../parsers/src';
import CAMPAIGNS_LIST from './listMock';

const session = {
  publish: {
    accessToken: '',
  },
};

const params = ({ globalOrganizationId }) => {
  return {
    globalOrganizationId,
  };
};

const PublishAPI = { get: jest.fn() };
const geCampaignsList = ({ globalOrganizationId }) =>
  RPCEndpoint.fn(params({ globalOrganizationId }), { session }, null, {
    PublishAPI,
    parsers,
  });

describe('RPC | Get list of campaigns', () => {
  it('gets the campaigns list successfully', async () => {
    PublishAPI.get.mockResolvedValueOnce(CAMPAIGNS_LIST);
    await geCampaignsList({ globalOrganizationId: '123' }).then(response => {
      expect(response.length).toEqual(4);
      response.forEach(campaign => {
        expect(campaign.globalOrganizationId).toBe('123');
        expect(campaign.dateRange).not.toBeUndefined();
        expect(campaign.lastUpdated).toContain('Last updated ');
      });
    });
  });
});
