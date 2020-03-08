/* eslint-disable import/first */
import moment from 'moment';

jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import compare from './';
import {
  DAILY_RESPONSE_EMPTY,
  DAILY_RESPONSE_AVERAGE_METRICS,
  PAST_DAILY_RESPONSE_AVERAGE_METRICS,
  CURRENT_PERIOD_DAILY_RESPONSE,
  PAST_PERIOD_DAILY_RESPONSE,
  PAST_PERIOD_DAILY_PARTIAL_RESPONSE,
} from './mockResponses';

describe('rpc/compare', () => {
  const profileId = '123159ad';
  const profileService = 'facebook';
  const token = 'some token';
  const mockedRequest = {
    session: {
      publish: {
        accessToken: token,
      },
    },
    app: {
      get() {
        return 'analyze-api';
      },
    },
  };

  it('should have the expected name', () => {
    expect(compare.name).toBe('compare');
  });

  it('should have the expected docs', () => {
    expect(compare.docs).toBe('fetch analytics compare for profiles and pages');
  });

  it('should request metrics to Analyze Api for Instagram', () => {
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    compare.fn(
      {
        startDate: start,
        endDate: end,
        profileId,
        profileService: 'instagram',
      },
      mockedRequest
    );

    expect(rp.mock.calls[0]).toEqual([
      {
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
      },
    ]);
  });

  it('should request for the previous week', () => {
    rp.mockClear();
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    compare.fn(
      {
        startDate: start,
        endDate: end,
        profileId,
        profileService,
      },
      mockedRequest
    );

    expect(rp.mock.calls[0]).toEqual([
      {
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
      },
    ]);
  });

  it('should request for the week before that', () => {
    const endDate = moment()
      .subtract(1, 'days')
      .unix();
    const startDate = moment()
      .subtract(7, 'days')
      .unix();

    compare.fn(
      {
        startDate,
        endDate,
        profileId,
        profileService,
      },
      mockedRequest
    );

    const end = moment()
      .subtract(8, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(14, 'days')
      .format('MM/DD/YYYY');

    expect(rp.mock.calls[1]).toEqual([
      {
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
      },
    ]);
  });

  it('it should return both total and daily compares', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await compare.fn({ profileId, profileService }, mockedRequest);

    expect(data.daily).toBeDefined();
    expect(data.totals).toBeDefined();
  });

  it('should return the metrics value and diff, compared by total updates sent in the period', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await compare.fn({ profileId, profileService }, mockedRequest);

    expect(data.totals[0]).toEqual({
      diff: 1,
      key: 'followers',
      label: 'Total Fans',
      color: '#FDA3F3',
      value: 100369,
      previousValue: 99783,
      postsCount: 9,
      previousPostsCount: 8,
    });
  });

  it('should return a valid response if all data is 0', async () => {
    rp.mockReturnValueOnce(Promise.resolve(DAILY_RESPONSE_EMPTY));
    rp.mockReturnValueOnce(Promise.resolve(DAILY_RESPONSE_EMPTY));

    const data = await compare.fn({ profileId, profileService }, mockedRequest);

    expect(data.totals.length).toBe(11);
    expect(data.totals[0]).toEqual({
      diff: 0,
      key: 'followers',
      label: 'Total Fans',
      color: '#FDA3F3',
      value: 0,
      previousValue: 0,
      postsCount: 0,
      previousPostsCount: 0,
    });
  });

  it('should return a valid response if previous data is 0', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(DAILY_RESPONSE_EMPTY));

    const data = await compare.fn({ profileId, profileService }, mockedRequest);

    expect(data.totals.length).toBe(11);
    expect(data.totals[0]).toEqual({
      diff: 10036900,
      key: 'followers',
      label: 'Total Fans',
      color: '#FDA3F3',
      value: 100369,
      previousValue: 0,
      postsCount: 9,
      previousPostsCount: 0,
    });
  });

  it('should average metrics for days where the value to average is > 0', async () => {
    rp.mockReturnValueOnce(Promise.resolve(DAILY_RESPONSE_AVERAGE_METRICS));
    rp.mockReturnValueOnce(
      Promise.resolve(PAST_DAILY_RESPONSE_AVERAGE_METRICS)
    );

    const data = await compare.fn({ profileId, profileService }, mockedRequest);

    expect(data.totals[10]).toEqual({
      diff: 44,
      key: 'engagement_rate',
      label: 'Engagement Rate',
      color: '#98E8B2',
      value: 1.15,
      previousValue: 0.8,
      postsCount: 3,
      previousPostsCount: 3,
    });
  });

  it('should return the daily compares', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await compare.fn({ profileId, profileService }, mockedRequest);

    expect(data.daily.length).toBe(7);

    expect(data.daily[0]).toMatchObject({
      day: '1504051200000',
      previousPeriodDay: '1503446400000',
    });
  });
});
