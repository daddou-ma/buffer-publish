import RPCEndpoint from '.';

const post = require('../../../requestMethods/post');

jest.mock('../../../requestMethods/post');

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};

const campaignId = '223344';
const params = {
  campaignId,
  name: 'Test',
  color: '#bebebe',
};

const updateCampaign = () => RPCEndpoint.fn(params, { session });
const UPDATE_CAMPAIGN_RESPONSE = {
  data: {
    _id: '123456',
    organization_id: '98765',
    name: 'Test',
    color: '#bebebe',
    created_at: '2020-02-24 13:08:33',
    updated_at: '2020-02-24 13:08:33',
    start_date: '',
    end_date: '',
  },
  success: true,
};

describe('RPC | Update campaign', () => {
  it('updates a campaign correctly', async () => {
    post.mockReturnValueOnce(Promise.resolve(UPDATE_CAMPAIGN_RESPONSE));
    await updateCampaign(params).then(response => {
      expect(response.name).toBe(params.name);
      expect(response.color).toBe(params.color);
      expect(response.lastUpdated).toBe(`Last updated ${response.updatedAt}`);
    });
  });

  it('fails to update a campaign due to missing params', async () => {
    post.mockReturnValueOnce(
      Promise.reject(new TypeError('Missing campaign id'))
    );
    try {
      await updateCampaign({
        name: 'Test',
        color: '#ffffff',
      }).then(response => {
        throw new TypeError(response);
      });
    } catch (err) {
      expect(err.message).toEqual('Missing campaign id');
    }
  });
});
