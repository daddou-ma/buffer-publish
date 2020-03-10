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
  campaign_id: '12345',
};

const deleteCampaign = () => RPCEndpoint.fn(params, { session });
const DELETE_CAMPAIGN_RESPONSE = {
  message: 'The campaign was deleted',
  success: true,
};

describe('RPC | Delete campaign', () => {
  it('deletes a campaign correctly', async () => {
    post.mockReturnValueOnce(Promise.resolve(DELETE_CAMPAIGN_RESPONSE));
    await deleteCampaign(params).then(response => {
      expect(response.message).toBe('The campaign was deleted');
      expect(response.success).toBe(true);
    });
  });

  it("fails to deletes campaign because user can't manage it", async () => {
    post.mockReturnValueOnce(
      Promise.reject(
        new Error(
          "User does not have access to campaign or it doesn't exist"
        )
      )
    );
    try {
      await deleteCampaign(params).then(response => {
        throw new Error(response);
      });
    } catch (err) {
	  expect(err.error).toBeUndefined();
      expect(err.message).toEqual(
        "User does not have access to campaign or it doesn't exist"
      );
    }
  });
});
