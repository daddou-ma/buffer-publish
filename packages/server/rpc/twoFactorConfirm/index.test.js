/* eslint-disable import/first */

jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');

import rp from 'request-promise';
import twoFactorConfirm from './';

describe('rpc/twoFactorConfirm', () => {
  it('should have the expected name', () => {
    expect(twoFactorConfirm.name).toBe('twoFactorConfirm');
  });

  it('should have the expected docs', () => {
    expect(twoFactorConfirm.docs).toBe('confirm tfa settings');
  });

  it('should send a POST request to /user/twofactor/confirm.json with settings', async () => {
    const params = {
      code: '111',
      initKey: 'ASDAAAVS',
      tfaMethod: 'sms',
      tel: '+1 555 555 5555',
      edit: false,
    };

    const expectedParams = {
      code: '111',
      init_key: 'ASDAAAVS',
      method: 'sms',
      tel: '+1 555 555 5555',
      edit: false,
    };

    rp.mockReturnValueOnce(
      Promise.resolve({
        success: true,
      })
    );

    await twoFactorConfirm.fn(params, {
      session: {
        publish: {
          accessToken: 'access-token!',
        },
      },
    });

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: `${process.env.API_ADDR}/1/user/twofactor/confirm.json`,
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
