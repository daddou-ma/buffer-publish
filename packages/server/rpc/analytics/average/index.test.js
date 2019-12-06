/* eslint-disable import/first */
import moment from 'moment';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import average from './';
import {
  CURRENT_PERIOD_TOTALS_RESPONSE,
  PAST_PERIOD_TOTALS_RESPONSE,
  EMPTY_TOTALS_RESPONSE,
  CURRENT_PERIOD_DAILY_RESPONSE,
  PAST_PERIOD_DAILY_RESPONSE,
  CURRENT_PERIOD_TOTALS_RESPONSE_TWITTER,
  PAST_PERIOD_TOTALS_RESPONSE_TWITTER,
  CURRENT_PERIOD_DAILY_RESPONSE_TWITTER,
  PAST_PERIOD_DAILY_RESPONSE_TWITTER,
  CURRENT_PERIOD_TOTALS_RESPONSE_INSTAGRAM,
  PAST_PERIOD_TOTALS_RESPONSE_INSTAGRAM,
  CURRENT_PERIOD_DAILY_RESPONSE_INSTAGRAM,
  PAST_PERIOD_DAILY_RESPONSE_INSTAGRAM,
} from './mockResponses';

describe('rpc/average', () => {
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
    expect(average.name).toBe('average');
  });

  it('should have the expected docs', () => {
    expect(average.docs).toBe('fetch analytics average for profiles and pages');
  });

  it('should request metrics to Analyze Api for Instagram', () => {
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    average.fn(
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
        uri: 'analyze-api/metrics/totals',
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

    expect(rp.mock.calls[2]).toEqual([
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

  it('should request for the past week', () => {
    rp.mockClear();
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    average.fn(
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
        uri: 'analyze-api/metrics/totals',
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
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    average.fn(
      {
        start,
        end,
        profileId,
        profileService,
      },
      mockedRequest
    );

    const expectedEnd = moment()
      .subtract(8, 'days')
      .format('MM/DD/YYYY');
    const expectedStart = moment()
      .subtract(14, 'days')
      .format('MM/DD/YYYY');

    expect(rp.mock.calls[1]).toEqual([
      {
        uri: 'analyze-api/metrics/totals',
        method: 'POST',
        strictSSL: false,
        qs: {
          access_token: token,
          start_date: expectedStart,
          end_date: expectedEnd,
          profile_id: profileId,
        },
        json: true,
      },
    ]);
  });

  it('it should return both total and daily averages', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await average.fn({ profileId, profileService }, mockedRequest);

    expect(data.daily).toBeDefined();
    expect(data.totals).toBeDefined();
  });

  it('should return only the average metrics', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await average.fn({ profileId, profileService }, mockedRequest);

    expect(data.totals.length).toEqual(3);
  });

  it('should return the metrics value and diff, averaged by number of days', async () => {
    // the numnber of days is 7
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await average.fn({ profileId, profileService }, mockedRequest);
    expect(data.totals).toEqual([
      {
        diff: 202,
        label: 'Daily average impressions',
        value: 168719,
        metricKey: 'impressions',
      },
      {
        diff: 149,
        label: 'Daily average engagements',
        value: 1833,
        metricKey: 'engagements',
      },
      {
        diff: 173,
        label: 'Daily average clicks',
        value: 8570,
        metricKey: 'clicks',
      },
    ]);
  });

  it('should return the metrics value and diff, averaged by total updates sent in the period', async () => {
    // twitter mock response
    rp.mockReturnValueOnce(
      Promise.resolve(CURRENT_PERIOD_TOTALS_RESPONSE_TWITTER)
    );
    rp.mockReturnValueOnce(
      Promise.resolve(PAST_PERIOD_TOTALS_RESPONSE_TWITTER)
    );
    rp.mockReturnValueOnce(
      Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE_TWITTER)
    );
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE_TWITTER));

    const data = await average.fn(
      { profileId, profileService: 'twitter' },
      mockedRequest
    );

    expect(data.totals).toEqual([
      {
        diff: 0,
        label: 'Average impressions per tweet',
        value: 100,
        metricKey: 'impressions',
      },
      {
        diff: 900,
        label: 'Average engagements per tweet',
        value: 200,
        metricKey: 'engagements',
      },
      {
        diff: 0,
        label: 'Average clicks per tweet',
        value: 20,
        metricKey: 'clicks',
      },
    ]);
  });

  it('should return the metrics value and diff, impressions should be averaged by the number of days', async () => {
    // instagram mock response
    rp.mockReturnValueOnce(
      Promise.resolve(CURRENT_PERIOD_TOTALS_RESPONSE_INSTAGRAM)
    );
    rp.mockReturnValueOnce(
      Promise.resolve(PAST_PERIOD_TOTALS_RESPONSE_INSTAGRAM)
    );
    // we don't care about the daily metrics in this test
    rp.mockReturnValueOnce(
      Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE_INSTAGRAM)
    );
    rp.mockReturnValueOnce(
      Promise.resolve(PAST_PERIOD_DAILY_RESPONSE_INSTAGRAM)
    );

    const data = await average.fn(
      { profileId, profileService: 'instagram' },
      mockedRequest
    );

    expect(data.totals).toEqual([
      {
        diff: -50,
        label: 'Daily average impressions',
        value: 7,
        metricKey: 'impressions',
      },
      {
        diff: 100,
        label: 'Average likes per post',
        value: 20,
        metricKey: 'likes',
      },
      {
        diff: 100,
        label: 'Average comments per post',
        value: 10,
        metricKey: 'comments',
      },
    ]);
  });

  it('should return a valid response if all data is 0', async () => {
    rp.mockReturnValueOnce(Promise.resolve(EMPTY_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(EMPTY_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await average.fn({ profileId, profileService }, mockedRequest);

    expect(data.totals).toEqual([
      {
        diff: 0,
        label: 'Daily average impressions',
        value: 0,
        metricKey: 'impressions',
      },
      {
        diff: 0,
        label: 'Daily average engagements',
        value: 0,
        metricKey: 'engagements',
      },
      {
        diff: 0,
        label: 'Daily average clicks',
        value: 0,
        metricKey: 'clicks',
      },
    ]);
  });

  it('should return a valid response if previous data is 0', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(EMPTY_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await average.fn({ profileId, profileService }, mockedRequest);
    // values should be the same but the diff is larger now
    expect(data.totals).toEqual([
      {
        diff: 16871900,
        label: 'Daily average impressions',
        value: 168719,
        metricKey: 'impressions',
      },
      {
        diff: 183300,
        label: 'Daily average engagements',
        value: 1833,
        metricKey: 'engagements',
      },
      {
        diff: 857000,
        label: 'Daily average clicks',
        value: 8570,
        metricKey: 'clicks',
      },
    ]);
  });

  it('should return the daily averages', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_TOTALS_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_DAILY_RESPONSE));

    const data = await average.fn({ profileId, profileService }, mockedRequest);

    expect(data.daily.length).toBe(7);
    expect(data.daily[0]).toEqual({
      day: '1504051200000',
      metrics: [
        {
          diff: 869,
          label: 'Daily average engagements',
          value: 3119,
          metricKey: 'engagements',
        },
        {
          diff: 74,
          label: 'Daily average impressions',
          value: 78966,
          metricKey: 'impressions',
        },
        {
          diff: 47,
          label: 'Daily average clicks',
          value: 2656,
          metricKey: 'clicks',
        },
      ],
    });
  });
});
