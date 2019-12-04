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

const startProTrial = source =>
  RPCEndpoint.fn(
    {
      source,
      plan: 'pro',
    },
    { session }
  );

describe('rpc/startTrial', () => {
  it('it sends the correct cta for specific trial paths', () => {
    rp.mockReturnValueOnce(Promise.resolve({}));
    startProTrial('queue_limit');
    expect(rp.mock.calls[rp.mock.calls.length - 1][0].qs.cta).toBe(
      SEGMENT_NAMES.QUEUE_LIMIT_PRO_TRIAL
    );
  });

  // it('it sends null for empty sources', () => {
  //   rp.mockReturnValueOnce(Promise.resolve({}));
  //   startProTrial();
  //   expect(rp.mock.calls[rp.mock.calls.length - 1][0].qs.cta).toBe(null);
  // });
});
