/* eslint-disable import/first */
jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import analyticsStartDate from './';

describe('rpc/analytics_start_date', () => {
  const profileId = '123159ad';
  const accessToken = 'some token';

  it('should have the expected name', () => {
    expect(analyticsStartDate.name)
      .toBe('analytics_start_date');
  });

  it('should have the expected docs', () => {
    expect(analyticsStartDate.docs)
      .toBe('fetch analytics start date for profiles and pages');
  });

  it('should request the analytics start date for the profile', async () => {
    rp.mockReturnValueOnce(Promise.resolve({
      response: ['start_date_for_this_profile'],
    }));
    const startDate = await analyticsStartDate.fn({ profileId }, {
      session: {
        analyze: {
          accessToken,
        },
      },
    });

    expect(rp.mock.calls[0])
      .toEqual([{
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/gnip_start_date.json`,
        method: 'GET',
        strictSSL: false,
        qs: {
          access_token: accessToken,
        },
        json: true,
      }]);

    expect(startDate).toBe('start_date_for_this_profile');
  });
});
