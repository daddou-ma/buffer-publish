const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const DateRange = require('../utils/DateRange');
const METRICS_CONFIG = require('./metricsConfig');

const requestAudience = (profileId, dateRange, accessToken, analyzeApiAddr) =>
  rp({
    uri: `${analyzeApiAddr}/metrics/daily_totals`,
    method: 'POST',
    strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
    qs: {
      access_token: accessToken,
      start_date: dateRange.start,
      end_date: dateRange.end,
      profile_id: profileId,
    },
    json: true,
  });

function formatDaily(
  dailyTotalsResult,
  profileService,
) {
  const days = Object.keys(dailyTotalsResult);
  const daily = days.map((day) => {
    const dayData = dailyTotalsResult[day];
    const postsCountMetric = dayData.posts_count;
    const metrics = Object.keys(dayData).map(metricKey => Object.assign({},
      {
        postsCount: postsCountMetric || 0,
        value: dayData[metricKey],
      },
      METRICS_CONFIG[profileService].config[metricKey],
      dayData[metricKey],
    )).filter(metric => metric.label !== undefined);
    return {
      day: String(day),
      metrics,
    };
  });
  return daily;
}

function getMetrics(profileService) {
  return METRICS_CONFIG[profileService].orderedKeys.map(
    metricKey => METRICS_CONFIG[profileService].config[metricKey],
  );
}

function formatData(
  audienceResponse,
  profileService,
) {
  const data = formatDaily(
    audienceResponse,
    profileService,
  );

  const metrics = getMetrics(profileService);

  return {
    data,
    metrics,
  };
}

module.exports = method(
  'audience',
  'fetch analytics audience for profiles and pages',
  ({ profileId, profileService, startDate, endDate }, req) => {
    const dateRange = new DateRange(startDate, endDate);
    return requestAudience(
      profileId,
      dateRange,
      req.session.analyze.accessToken,
      req.app.get('analyzeApiAddr'),
    )
      .then(response => formatData(
        response.response,
        profileService,
      ))
      .catch(() => ({
        data: [],
        metrics: [],
      }));
  },
);
