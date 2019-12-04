/* eslint-disable import/first */
import moment from 'moment-timezone';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import postsSummary from './';
import { CURRENT_PERIOD_RESPONSE, PAST_PERIOD_RESPONSE } from './mockResponses';

describe('rpc/posts_summary', () => {
  const profileId = '123159ad';
  const token = 'some token';

  it('should have the expected name', () => {
    expect(postsSummary.name).toBe('posts_summary');
  });

  it('should have the expected docs', () => {
    expect(postsSummary.docs).toBe(
      'fetch analytics posts summary for profiles and pages'
    );
  });

  it('should request metrics to Analyze Api for Instagram', () => {
    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    postsSummary.fn(
      {
        startDate: start,
        endDate: end,
        profileId,
        profileService: 'instagram',
      },
      {
        app: {
          get() {
            return process.env.API_ADDR;
          },
        },
        session: {
          publish: {
            accessToken: token,
          },
        },
      }
    );

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: `${process.env.ANALYZE_API_ADDR}/metrics/post_totals`,
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

    postsSummary.fn(
      {
        startDate: start,
        endDate: end,
        profileId,
        profileService: 'twitter',
      },
      {
        app: {
          get() {
            return 'analyze-api';
          },
        },
        session: {
          publish: {
            accessToken: token,
          },
        },
      }
    );

    expect(rp.mock.calls[0]).toEqual([
      {
        uri: 'analyze-api/metrics/post_totals',
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
      .format('MM/DD/YYYY');
    const startDate = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    postsSummary.fn(
      {
        startDate,
        endDate,
        profileId,
        profileService: 'twitter',
      },
      {
        app: {
          get() {
            return 'analyze-api';
          },
        },
        session: {
          publish: {
            accessToken: token,
          },
        },
      }
    );

    const end = moment()
      .subtract(8, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(14, 'days')
      .format('MM/DD/YYYY');

    expect(rp.mock.calls[1]).toEqual([
      {
        uri: 'analyze-api/metrics/post_totals',
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

  it('should combine the data for the two periods and show the current period value and the % difference', async () => {
    rp.mockReturnValueOnce(Promise.resolve(CURRENT_PERIOD_RESPONSE));
    rp.mockReturnValueOnce(Promise.resolve(PAST_PERIOD_RESPONSE));

    const end = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const start = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    const postsSummaryData = await postsSummary.fn(
      {
        startDate: start,
        endDate: end,
        profileId,
        profileService: 'facebook',
      },
      {
        app: {
          get() {
            return process.env.API_ADDR;
          },
        },
        session: {
          publish: {
            accessToken: token,
          },
        },
      }
    );

    expect(postsSummaryData).toEqual([
      {
        label: 'Posts',
        value: 3,
        diff: -40,
      },
      {
        label: 'Reach',
        value: 1181030,
        diff: -0,
      },
      {
        label: 'Reactions',
        value: 9391,
        diff: 0,
      },
      {
        label: 'Comments',
        value: 100,
        diff: 25,
      },
      {
        label: 'Shares',
        value: 5,
        diff: 150,
      },
      {
        label: 'Engagement Rate',
        value: 12,
        diff: 100,
      },
    ]);
  });
});
