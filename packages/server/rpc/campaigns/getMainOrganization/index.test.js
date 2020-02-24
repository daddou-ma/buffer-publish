import RPCEndpoint from '.';

const get = require('../../../requestMethods/get');

jest.mock('../../../requestMethods/get');

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};

const getMainOrganization = () => RPCEndpoint.fn(null, { session });

const MAIN_ORGANIZATION = {
  data: {
    main_organization: {
      id: '5bfd3e488d9ba6000d5fe4c7',
      _id: 'bfd3e488d9ba6000d5fe4c7',
      created_at: 1543323208,
      name: 'My Organization',
      owner_id: '5bfd3e488d9ba6000d5fe4c3',
      updated_at: 1543323208,
      owner_email: 'owner-org@buffer.com',
      is_owner_paying: true,
      is_free_plan: false,
      locked: false,
    },
    is_org_admin: true,
  },
  success: true,
};

describe('RPC | Get user main organization', () => {
  it('gets the main organization correctly', async () => {
    get.mockReturnValueOnce(Promise.resolve(MAIN_ORGANIZATION));
    await getMainOrganization().then(response => {
      expect(response.isOrgAdmin).toBeTruthy();
      expect(response.mainOrganization).not.toBeNull();
    });
  });

  it('fails to get the main organization', async () => {
    get.mockReturnValueOnce(Promise.reject(new TypeError('Error ocurred')));
    try {
      await getMainOrganization().then(response => {
        throw new TypeError(response);
      });
    } catch (err) {
      expect(err.message).toEqual('Error ocurred');
    }
  });
});
