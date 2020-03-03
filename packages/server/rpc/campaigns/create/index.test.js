import RPCEndpoint from '.';

const post = require('../../../requestMethods/post');

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
    name: 'Test',
    color: '#ffffff',
    created_at: '2020-02-24 13:08:33',
    updated_at: '2020-02-24 13:08:33',
    start_date: '',
    end_date: '',
  },
  success: true,
};

describe('RPC | Create campaign', () => {
  it('creates a campaign correctly', async () => {
    post.mockReturnValueOnce(Promise.resolve(CREATE_CAMPAIGN_RESPONSE));
    await createCampaign(params).then(response => {
      expect(response.name).toBe(params.name);
      expect(response.color).toBe(params.color);
      expect(response.lastUpdated).toBe(`Last updated ${response.updatedAt}`);
    });
  });

  it('fails to create campaign due to missing params', async () => {
    post.mockReturnValueOnce(
      Promise.reject(new TypeError('Missing organization id'))
    );
    try {
      await createCampaign({
        name: 'Test',
        color: '#ffffff',
      }).then(response => {
        throw new TypeError(response);
      });
    } catch (err) {
      expect(err.message).toEqual('Missing organization id');
    }
  });
});
