/* eslint-disable import/first */
import moment from 'moment-timezone';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';

jest.mock('../summary');
import summary from '../summary';
import getReport from './';

describe('rpc/get_report', () => {
  const token = 'some token';
  const timezone = 'Europe/Amsterdam';
  const session = {
    session: {
      accessToken: token,
    },
    app: {
      get() {
        return 'analyze-api';
      },
    },
  };
  const id = 'report-1235asd';
  moment.tz.setDefault(timezone);
  const endDate = moment()
    .startOf('day')
    .subtract(1, 'days')
    .format('MM/DD/YYYY');
  const startDate = moment()
    .startOf('day')
    .subtract(30, 'days')
    .format('MM/DD/YYYY');
  moment.tz.setDefault();

  const report = {
    id,
    date_range: {
      range: 30,
    },
    charts: [
      {
        chart_id: 'summary-table',
        profile_id: '12351wa',
        service: 'facebook',
        profile: {
          _id: '12351wa',
          service: 'facebook',
          avatar_url: 'https://avatar.url',
          service_username: 'Buffer',
        },
      },
      {
        chart_id: 'deprecated-chart',
        profile_id: '12351wa',
        service: 'facebook',
        profile: {
          _id: '12351wa',
          service: 'facebook',
          avatar_url: 'https://avatar.url',
          service_username: 'Buffer',
        },
      },
      {
        chart_id: 'summary-table',
        profile_id: '12351xa',
        service: 'facebook',
        profile: {
          _id: '12351wa',
          service: 'facebook',
          avatar_url: 'https://avatar.url',
          service_username: 'Buffer',
        },
      },
    ],
  };

  beforeEach(() => {
    rp.mockReturnValueOnce(Promise.resolve(report));
  });

  it('should have the expected name', () => {
    expect(getReport.name).toBe('get_report');
  });

  it('should have the expected docs', () => {
    expect(getReport.docs).toBe('get report details');
  });

  it('should request chart data for every chart on the argument list', async () => {
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve([]));

    await getReport.fn({ _id: id, timezone }, session);

    expect(summary.fn.mock.calls[0]).toEqual([
      {
        profileId: '12351wa',
        profileService: 'facebook',
        startDate,
        endDate,
      },
      session,
    ]);
  });

  it('returns chart data for each chart as a "metrics" key', async () => {
    const metrics = [1, 2, 3, 4];
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metrics));

    const result = await getReport.fn({ _id: id, timezone }, session);

    expect(result.charts[0].metrics).toEqual(metrics);
  });

  it('if chart metrics is an object with a metrics attribute, we merge the full object into the chart', async () => {
    const metricsEmbeddedInObject = {
      metrics: [1, 2, 3, 4],
      posts: ['a post', 'another post'],
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metricsEmbeddedInObject));

    const result = await getReport.fn({ _id: id, timezone }, session);

    expect(result.charts[0].metrics).toEqual(metricsEmbeddedInObject.metrics);
    expect(result.charts[0].posts).toEqual(metricsEmbeddedInObject.posts);
  });

  it('destructures over state as arguments for the charts rpc method', async () => {
    const metricsEmbeddedInObject = {
      metrics: [1, 2, 3, 4],
      posts: ['a post', 'another post'],
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metricsEmbeddedInObject));

    await getReport.fn({ _id: id, timezone }, session);

    expect(summary.fn.mock.calls[0][0]).toEqual({
      profileId: '12351wa',
      profileService: 'facebook',
      endDate,
      startDate,
    });
  });

  it('uses a custom date if the date range provided in the report is custom', async () => {
    report.date_range = {
      range: null,
      startDate: moment()
        .subtract(20, 'days')
        .format('MM/DD/YYYY'),
      endDate: moment()
        .subtract(15, 'days')
        .format('MM/DD/YYYY'),
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve([]));

    await getReport.fn({ _id: id, timezone }, session);

    expect(summary.fn.mock.calls[0][0]).toEqual({
      profileId: '12351wa',
      profileService: 'facebook',
      start: report.date_range.startDate,
      end: report.date_range.endDate,
    });
  });

  it('should proprely resolve reports with unix date range', async () => {
    moment.tz.setDefault(timezone);
    const start = moment().subtract(20, 'days');
    const end = moment().subtract(15, 'days');
    moment.tz.setDefault();

    report.date_range = {
      range: null,
      start: start.unix(),
      end: end.unix(),
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve([]));

    await getReport.fn({ _id: id, timezone }, session);

    expect(summary.fn.mock.calls[0][0]).toEqual({
      profileId: '12351wa',
      profileService: 'facebook',
      startDate: start.format('MM/DD/YYYY'),
      endDate: end.format('MM/DD/YYYY'),
    });
  });

  it('assigns chart state to the chart response', async () => {
    const metricsEmbeddedInObject = {
      metrics: [1, 2, 3, 4],
      posts: ['a post', 'another post'],
    };
    summary.fn = jest.fn();
    summary.fn.mockReturnValueOnce(Promise.resolve(metricsEmbeddedInObject));

    const response = await getReport.fn({ _id: id, timezone }, session);

    expect(response.charts[0]).toEqual({
      ...report.charts[0],
      ...report.charts[0].state,
      ...metricsEmbeddedInObject,
    });
  });

  it('prunes unsupported charts', async () => {
    const metrics = [1, 2, 3, 4];
    const reports = {
      id,
      charts: [
        {
          chart_id: 'deprecated-chart',
          profile_id: '12351wa',
          service: 'facebook',
        },
        {
          chart_id: 'summary-table',
          profile_id: '12351wa',
          service: 'facebook',
        },
      ],
    };

    rp.mockReturnValue(Promise.resolve(reports));
    summary.fn = jest.fn();
    summary.fn.mockReturnValue(Promise.resolve(metrics));

    const result = await getReport.fn({ _id: id, timezone }, session);

    expect(result.charts.length).toEqual(2);
  });
});
