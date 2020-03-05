/* eslint-disable import/first */
import moment from 'moment';

jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import { response, rpcFinalResponse } from './mockResponse';
import comparison from './';

describe('rpc/comparison', () => {
  const profileIds = ['profile1234'];

  it('should have the expected name', () => {
    expect(comparison.name).toBe('comparison');
  });

  it('should have the expected docs', () => {
    expect(comparison.docs).toBe(
      'get daily comparison data for the given profiles'
    );
  });

  it('should send a POST request to /comparison with the provided parameters for every metric', async () => {
    const startDate = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');
    const endDate = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    rp.mockReturnValue(Promise.resolve(response));
    const result = await comparison.fn(
      { profileIds, startDate, endDate },
      {
        app: {
          get() {
            return 'analyze-api';
          },
        },
      }
    );

    expect(result.metrics).toEqual(rpcFinalResponse);

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: 'analyze-api/comparison',
        method: 'POST',
        strictSSL: !(
          process.env.NODE_ENV === 'development' ||
          process.env.NODE_ENV === 'test'
        ),
        body: {
          profiles: profileIds,
          metrics: ['audience', 'reach', 'likes', 'engagement', 'comments'],
          start_date: startDate,
          end_date: endDate,
        },
        json: true,
      },
    ]);
    expect(rp).toHaveBeenCalledTimes(1);
  });
});
