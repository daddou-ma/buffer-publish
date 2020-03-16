/* eslint-disable import/first */

jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');

import rp from 'request-promise';
import twoFactorRecovery from './';

describe('rpc/twoFactorRecovery', () => {
  it('should have the expected name', () => {
    expect(twoFactorRecovery.name).toBe('twoFactorRecovery');
  });

  it('should have the expected docs', () => {
    expect(twoFactorRecovery.docs).toBe('fetch tfa recovery code');
  });

  it('should send a POST request to /user/twofactor/recovery.json', async () => {
    rp.mockReturnValueOnce(
      Promise.resolve({
        success: true,
        recovery: 'foo',
      })
    );

    await twoFactorRecovery.fn(
      {},
      {
        session: {
          publish: {
            accessToken: 'access-token!',
          },
        },
      }
    );

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: `${process.env.API_ADDR}/1/user/twofactor/recovery.json`,
        method: 'POST',
        strictSSL: !(
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
        ),
        json: true,
        form: {
          access_token: 'access-token!',
        },
      },
    ]);
  });
});
