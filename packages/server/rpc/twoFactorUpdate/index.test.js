/* eslint-disable import/first */

jest.mock('micro-rpc-client');
jest.mock('request-promise');

import rp from 'request-promise';
import twoFactorUpdate from './';

describe('rpc/twoFactorUpdate', () => {
  it('should have the expected name', () => {
    expect(twoFactorUpdate.name).toBe('twoFactorUpdate');
  });

  it('should have the expected docs', () => {
    expect(twoFactorUpdate.docs).toBe('update tfa settings');
  });

  it('should send a POST request to /user/twofactor/update.json with settings', async () => {
    const params = {
      tfaMethod: 'app',
      tel: '+1 555 555 5555',
      edit: false,
    };

    const expectedParams = {
      method: 'app',
      tel: '+1 555 555 5555',
      edit: false,
    };

    rp.mockReturnValueOnce(
      Promise.resolve({
        success: true,
      })
    );

    await twoFactorUpdate.fn(params, {
      session: {
        publish: {
          accessToken: 'access-token!',
        },
      },
    });

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: `${process.env.API_ADDR}/1/user/twofactor/update.json`,
        method: 'POST',
        strictSSL: !(
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
        ),
        json: true,
        form: {
          ...expectedParams,
          access_token: 'access-token!',
        },
      },
    ]);
  });
});
