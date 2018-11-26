const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');

const METRICS = [{
  key: 'engagements',
  label: 'Engagements',
}, {
  key: 'impressions',
  label: 'Impressions',
}, {
  key: 'favorites',
  label: 'Likes',
}, {
  key: 'url_clicks',
  label: 'Clicks',
}, {
  key: 'retweets',
  label: 'Retweets',
}, {
  key: 'replies',
  label: 'Replies',
}];

module.exports = method(
  'hourly',
  'fetch hourly insights for profiles',
  ({ profileId, startDate, endDate, selectedMetric, secondaryMetric }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/hourly_totals.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
      qs: {
        access_token: session.analyze.accessToken,
        start_date: startDate,
        end_date: endDate,
      },
      json: true,
    }).then(({ response }) => {
      const hours = Object.keys(response);
      const postsCount = hours.map(hour => response[hour].posts_count);
      const metrics = METRICS.map(metric => ({
        label: metric.label,
        hourlyMetrics: hours.map(hour => response[hour][metric.key]),
      }));
      return {
        postsCount,
        metrics,
        selectedMetric: metrics.find(metric => metric.label === selectedMetric),
        secondaryMetric: metrics.find(metric => metric.label === secondaryMetric),
      };
    }),
);
