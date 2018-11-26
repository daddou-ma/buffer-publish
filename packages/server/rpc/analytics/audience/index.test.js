/* eslint-disable import/first */
import moment from 'moment';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import audience from './';
import CURRENT_PERIOD_DAILY_RESPONSE from './mockResponses';

rp.mockImplementation(() => new Promise(() => {}));

describe('rpc/audience', () => {
  const profileId = '123159ad';
  const profileService = 'instagram';
  const token = 'some token';
  const mockedRequest = {
    session: {
      analyze: {
        accessToken: token,
      },
    },
    app: {
      get() { return 'analyze-api'; },
    },
  };

  it('should have the expected name', () => {
    expect(audience.name)
      .toBe('audience');
  });

  it('should have the expected docs', () => {
    expect(audience.docs)
      .toBe('fetch analytics audience for profiles and pages');
  });

  it('should request audience data for the previous week', () => {
    const end = moment().subtract(1, 'days').format('MM/DD/YYYY');
    const start = moment().subtract(7, 'days').format('MM/DD/YYYY');

    audience.fn({
      startDate: start,
      endDate: end,
      profileId,
      profileService,
    }, mockedRequest);

    expect(rp.mock.calls[0])
      .toEqual([{
        uri: 'analyze-api/metrics/daily_totals',
        method: 'POST',
        strictSSL: false,
        qs: {
          access_token: token,
          start_date: start,
          end_date: end,
          profile_id: profileId,
        },
        json: true,
      }]);
  });

  it('it should return: data, metrics', async() => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await audience.fn({ profileId, profileService }, mockedRequest);

    expect(data.data).toBeDefined();
    expect(data.metrics).toBeDefined();
  });

  it('should return a valid response if all data is 0', async() => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await audience.fn({ profileId, profileService }, mockedRequest);

    expect(data.metrics.length).toBe(5);
    expect(data.metrics[0]).toEqual({
      label: 'Posts',
      key: 'posts_count',
      color: '#3A92D3',
    });
  });

  it('should return the daily data', async() => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await audience.fn({ profileId, profileService }, mockedRequest);
    expect(data.data.length).toBe(7);
    expect(data.data[0].day).toBe('1504051200000');
    expect(data.data[0].metrics.length).toBe(5);
    expect(data.data[0].metrics[0]).toMatchObject({
      key: 'posts_count',
      value: 4,
      postsCount: 4,
      label: 'Posts',
    });
  });

  it('should set postsCount to 0 if it is missing', async() => {
    const response = {
      response: {
        1504051200000: {
          likes: 79,
        },
      },
    };

    rp.mockReturnValueOnce(Promise.resolve(response));

    const data = await audience.fn({ profileId, profileService }, mockedRequest);
    expect(data.data.length).toBe(1);
    expect(data.data[0].metrics.length).toBe(1);
    expect(data.data[0].metrics[0]).toMatchObject({
      key: 'likes',
      value: 79,
      postsCount: 0,
    });
  });

  it('should return empty data if fetch failed', async() => {
    rp.mockReturnValueOnce(Promise.reject(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await audience.fn({ profileId, profileService }, mockedRequest);
    expect(data.data.length).toBe(0);
    expect(data.metrics.length).toBe(0);
  });
});
