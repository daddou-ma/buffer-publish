/* eslint-disable import/first */
import moment from 'moment';

jest.mock('micro-rpc-client');
jest.mock('request-promise');
import rp from 'request-promise';
import hourly from './';
import response from './mockResponse';

const shouldCallHourlyTotalsEndpointWith = (profileId, token, startDate, endDate) => {
  expect(rp.mock.calls[0])
    .toEqual([{
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/hourly_totals.json`,
      method: 'GET',
      strictSSL: false,
      qs: {
        access_token: token,
        start_date: startDate,
        end_date: endDate,
      },
      json: true,
    }]);
};

describe('rpc/hourly', () => {
  const profileId = '123159ad';
  const token = 'some token';
  const session = {
    session: {
      analyze: {
        accessToken: token,
      },
    },
  };

  it('should have the expected name', () => {
    expect(hourly.name)
      .toBe('hourly');
  });

  it('should have the expected docs', () => {
    expect(hourly.docs)
      .toBe('fetch hourly insights for profiles');
  });

  it('should request hourly data for current profile and date range', async () => {
    const endDate = moment().subtract(1, 'days').format('MM/DD/YYYY');
    const startDate = moment().subtract(7, 'days').format('MM/DD/YYYY');
    rp.mockReturnValueOnce(Promise.resolve(response));

    const hourlyData = await hourly.fn({ startDate, endDate, profileId }, session);

    shouldCallHourlyTotalsEndpointWith(profileId, token, startDate, endDate);
    expect(hourlyData.postsCount).toEqual(
      [1, 3, 0, 0, 0, 5, 10, 5, 0, 0, 1, 0, 4, 1, 0, 3, 1, 0, 0, 5, 0, 2, 1, 0]);
    expect(hourlyData.metrics[0]).toEqual({
      label: 'Engagements',
      hourlyMetrics: [780, 1581, 788, 832, 664, 1909, 1773, 4307, 2006, 1403, 1219, 1232, 5300, 3174, 2044, 1987, 2445, 1146, 896, 2706, 2293, 1287, 1295, 823], // eslint-disable-line max-len
    });
    expect(hourlyData.selectedMetric).toBe(undefined);
    expect(hourlyData.secondaryMetric).toBe(undefined);
  });

  it('returns selectedMetric if selected label is passed as parameter', async () => {
    const endDate = moment().subtract(1, 'days').format('MM/DD/YYYY');
    const startDate = moment().subtract(7, 'days').format('MM/DD/YYYY');
    const selectedMetric = 'Engagements';
    rp.mockReturnValueOnce(Promise.resolve(response));

    const hourlyData = await hourly.fn({
      startDate,
      endDate,
      profileId,
      selectedMetric,
    }, session);

    shouldCallHourlyTotalsEndpointWith(profileId, token, startDate, endDate);
    expect(hourlyData.selectedMetric).toEqual({
      label: 'Engagements',
      hourlyMetrics: [780, 1581, 788, 832, 664, 1909, 1773, 4307, 2006, 1403, 1219, 1232, 5300, 3174, 2044, 1987, 2445, 1146, 896, 2706, 2293, 1287, 1295, 823], // eslint-disable-line max-len
    });
    expect(hourlyData.secondaryMetric).toBe(undefined);
  });

  it('returns secondaryMetric if secondary metric label is passed as parameter', async () => {
    const endDate = moment().subtract(1, 'days').format('MM/DD/YYYY');
    const startDate = moment().subtract(7, 'days').format('MM/DD/YYYY');
    const secondaryMetric = 'Likes';
    rp.mockReturnValueOnce(Promise.resolve(response));

    const hourlyData = await hourly.fn({
      startDate,
      endDate,
      profileId,
      secondaryMetric,
    }, session);

    shouldCallHourlyTotalsEndpointWith(profileId, token, startDate, endDate);
    expect(hourlyData.secondaryMetric).toEqual({
      label: 'Likes',
      hourlyMetrics: [66, 157, 53, 74, 49, 237, 167, 270, 148, 87, 70, 71, 227, 142, 107, 321, 270, 102, 56, 178, 153, 75, 65, 38], // eslint-disable-line max-len
    });
  });
});
