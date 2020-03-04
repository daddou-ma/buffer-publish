/* eslint-disable import/first */
import moment from 'moment';

jest.mock('@bufferapp/micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import contextual from './';
import CURRENT_PERIOD_DAILY_RESPONSE from './mockResponses';

rp.mockImplementation(() => new Promise(() => {}));

describe('rpc/contextual', () => {
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
    expect(contextual.name).toBe('contextual');
  });

  it('should have the expected docs', () => {
    expect(contextual.docs).toBe(
      'fetch analytics contextual for profiles and pages'
    );
  });

  it('should request Questions Data to Analyze Api for Instagram', () => {
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    contextual.fn(
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
        uri: 'analyze-api/metrics/questions',
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

  it('should request Questions Data to Analyze Api for Twitter', () => {
    rp.mockClear();
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    contextual.fn(
      {
        startDate: start,
        endDate: end,
        profileId,
        profileService: 'twitter',
      },
      mockedRequest
    );

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: 'analyze-api/metrics/questions',
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

  it('should request contextual data for the previous week', () => {
    rp.mockClear();
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    contextual.fn(
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
        uri: `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/contextual.json`,
        method: 'GET',
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

  it('it should return: data, metrics, and presets', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );

    expect(data.data).toBeDefined();
    expect(data.metrics).toBeDefined();
    expect(data.presets).toBeDefined();
  });

  it('should return a valid response if all data is 0', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );

    expect(data.metrics.length).toBe(10);
    expect(data.metrics[0]).toEqual({
      label: 'Posts',
      key: 'posts_count',
    });
  });

  it('should return the daily data', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );
    expect(data.data.length).toBe(7);
    expect(data.data[0].day).toBe('1508371200000');
    expect(data.data[0].metrics.length).toBe(10);
    expect(data.data[0].metrics[0]).toMatchObject({
      key: 'posts_count',
      value: 1,
      postsCount: 1,
      label: 'Posts',
    });
  });

  it('should set postsCount to 0 if it is missing', async () => {
    const response = {
      response: {
        daily: [
          {
            day: 1508371200000,
            metrics: [
              {
                key: 'shares',
                value: 29,
              },
            ],
          },
        ],
        presets: [],
      },
    };

    rp.mockReturnValueOnce(Promise.resolve(response));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );
    expect(data.data.length).toBe(1);
    expect(data.data[0].metrics.length).toBe(1);
    expect(data.data[0].metrics[0]).toMatchObject({
      key: 'shares',
      value: 29,
      postsCount: 0,
    });
  });

  it('should return presets with empty data', async () => {
    const mockedResponse = {
      response: {
        daily: CURRENT_PERIOD_DAILY_RESPONSE.response.daily,
        presets: [
          {
            presetKey: 'content_type',
            xAxis: 'date',
            yAxis: {
              metrics: [
                {
                  key: 'new_followers',
                },
                {
                  key: 'posts_count',
                },
              ],
            },
            data: [],
          },
        ],
      },
    };
    rp.mockReturnValueOnce(Promise.resolve(mockedResponse));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );
    expect(data.presets.length).toBe(1);
  });

  it('should filter out unsuded presets', async () => {
    const mockedResponse = {
      response: {
        daily: CURRENT_PERIOD_DAILY_RESPONSE.response.daily,
        presets: [
          {
            presetKey: 'foo_bar',
            xAxis: 'date',
            yAxis: {
              metrics: [
                {
                  key: 'new_followers',
                },
                {
                  key: 'posts_count',
                },
              ],
            },
            data: [{}, {}],
          },
        ],
      },
    };
    rp.mockReturnValueOnce(Promise.resolve(mockedResponse));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );
    expect(data.presets.length).toBe(0);
  });

  it('should return the presets data', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );
    expect(data.presets.length).toBe(2);

    expect(data.presets[0].label).toBe(
      'How does post frequency affect my fan count?'
    );
    expect(data.presets[0].data.length).toBe(7);
    expect(data.presets[0].data[0]).toMatchObject({
      day: '1508371200000',
    });
    expect(data.presets[0].data[0].metrics.length).toBe(2);
    expect(data.presets[0].data[0].metrics[0]).toMatchObject({
      key: 'posts_count',
      label: 'Posts',
      postsCount: 1,
      value: 1,
    });
    expect(data.presets[0].yAxis.metrics[0]).toMatchObject({
      key: 'new_followers',
      label: 'New Fans',
    });
  });

  it('should return empty data if fetch failed', async () => {
    rp.mockReturnValueOnce(Promise.reject(CURRENT_PERIOD_DAILY_RESPONSE));

    const data = await contextual.fn(
      { profileId, profileService },
      mockedRequest
    );
    expect(data.presets.length).toBe(0);
    expect(data.data.length).toBe(0);
    expect(data.metrics.length).toBe(0);
  });
});
