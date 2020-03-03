import RPCEndpoint from '.';

const post = require('../../../requestMethods/post');
const { campaignParser } = require('../../../parsers/src');

jest.mock('../../../requestMethods/post');

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};

const params = {
  name: 'Test',
  color: '#ffffff',
};

const createCampaign = () => RPCEndpoint.fn(params, { session });
const CREATE_CAMPAIGN_RESPONSE = {
  data: {
    _id: '123456',
    global_organization_id: '000111',
    name: 'Test',
    color: '#ffffff',
    created_at: 1583166077,
    updated_at: 1583166098,
  },
  success: true,
};

describe('RPC | Create campaign', () => {
  it('creates a campaign correctly', async () => {
    post.mockReturnValueOnce(Promise.resolve(CREATE_CAMPAIGN_RESPONSE));
    await createCampaign(params).then(response => {
      expect(response.id).not.toBeUndefined();
      expect(response.globalOrganizationId).toBe('000111');
      expect(response.name).toBe(params.name);
      expect(response.color).toBe(params.color);
      expect(response.lastUpdated).toContain('Last updated ');
      expect(response.channels).toBeNull();
      expect(response.items).toBeNull();
    });
  });

  it('fails to create campaign due to missing params', async () => {
    post.mockReturnValueOnce(
      Promise.reject(new TypeError('Missing param: name'))
    );
    try {
      await createCampaign({
        color: '#ffffff',
      }).then(response => {
        throw new TypeError(response);
      });
    } catch (err) {
      expect(err.message).toEqual('Missing param: name');
    }
  });
});
