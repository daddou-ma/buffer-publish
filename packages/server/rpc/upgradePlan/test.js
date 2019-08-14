/* eslint-disable import/first */
jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import RPCEndpoint from './';

import { SEGMENT_NAMES } from '@bufferapp/publish-constants';

const accessToken = 'AN ACCESS TOKEN';
const session = {
  publish: {
    accessToken,
  },
};

const upgradeToPro = source =>
  RPCEndpoint.fn({
    cycle: 'year',
    token: 'stripe token',
    source,
  }, { session });

describe('rpc/upgradeToPro', () => {
  it('sends over a request to Buffer\'s API with Publish\'s access token', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    upgradeToPro();
    expect(rp.mock.calls[0][0].form.access_token).toBe(accessToken);
  });

  it('sends over the selected cycle and current stripe token', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    upgradeToPro();
    expect(rp.mock.calls[0][0].form.cycle).toBe('year');
    expect(rp.mock.calls[0][0].form.stripeToken).toBe('stripe token');
  });

  it('it sends the correct cta for specific upgrade paths', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    upgradeToPro('queue_limit');
    expect(rp.mock.calls[rp.mock.calls.length - 1][0].form.cta).toBe(SEGMENT_NAMES.QUEUE_LIMIT_PRO_UPGRADE);
  });

  it('it sends null for empty sources', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    upgradeToPro();
    expect(rp.mock.calls[rp.mock.calls.length - 1][0].form.cta).toBe(null);
  });

  it('an error response gets returned too', () => {
    rp.mockReturnValueOnce(Promise.reject({
      error: 'Something went wrong!',
    }));

    return upgradeToPro().catch(result => expect(result.message).toBe('Something went wrong!'));
  });
});
