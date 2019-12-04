/* eslint-disable import/first */
import moment from 'moment';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import summary from './';
import { CURRENT_PERIOD_RESPONSE, PAST_PERIOD_RESPONSE } from './mockResponses';

describe('rpc/summary', () => {
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
    expect(summary.name).toBe('summary');
  });

  it('should have the expected docs', () => {
    expect(summary.docs).toBe('fetch analytics summary for profiles and pages');
  });

  it('should request metrics to Analyze Api for Instagram', () => {
    const startDate = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');
    const endDate = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');

    summary.fn(
      {
        startDate,
        endDate,
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
          start_date: startDate,
          end_date: endDate,
          profile_id: profileId,
        },
        json: true,
      },
    ]);
  });

  it('should request for the past week', () => {
    rp.mockClear();
    const startDate = moment()
      .subtract(7, 'days')
      .format('MM/DD/YYYY');
    const endDate = moment()
      .subtract(1, 'days')
      .format('MM/DD/YYYY');

    summary.fn(
      {
        startDate,
        endDate,
        profileId,
        profileService,
      },
      mockedRequest
    );

    expect(rp.mock.calls[1]).toEqual([
      {
        uri: `analyze-api/metrics/totals`,
        method: 'POST',
        strictSSL: false,
        qs: {
          access_token: token,
          start_date: moment()
            .subtract(14, 'days')
            .format('MM/DD/YYYY'),
          end_date: moment()
            .subtract(8, 'days')
            .format('MM/DD/YYYY'),
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

    summary.fn(
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
        uri: `analyze-api/metrics/totals`,
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

    const summaryData = await summary.fn(
      { profileId, profileService },
      mockedRequest
    );

    expect(summaryData).toEqual([
      {
        label: 'Engaged Users',
        value: 56755,
        diff: 271,
      },
      {
        label: 'Post Impressions',
        value: 1181030,
        diff: 202,
      },
      {
        label: 'Reactions',
        value: 9391,
        diff: 226,
      },
      {
        label: 'Post Reach',
        value: 964968,
        diff: 240,
      },
      {
        label: 'Page & Post Engagements',
        value: 12831,
        diff: 149,
      },
      {
        label: 'Link Clicks',
        value: 59989,
        diff: 173,
      },
      {
        label: 'New Fans',
        value: 645,
        diff: -39,
      },
      {
        label: 'Posts',
        value: 3,
        diff: -40,
      },
    ]);
  });
});
