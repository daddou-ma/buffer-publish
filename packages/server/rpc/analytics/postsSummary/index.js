const { method } = require('@bufferapp/buffer-rpc');
const rp = require('request-promise');
const DateRange = require('../utils/DateRange');

const RPC_NAME = 'posts_summary';

const LABELS = {
  facebook: {
    posts_count: 'Posts',
    post_reach: 'Reach',
    reactions: 'Reactions',
    comments: 'Comments',
    shares: 'Shares',
    engagement_rate: 'Engagement Rate',
  },
  twitter: {
    posts_count: 'Posts',
    retweets: 'Retweets',
    replies: 'Replies',
    url_clicks: 'Clicks',
    favorites: 'Likes',
    engagement_rate: 'Engagement Rate',
  },
  instagram: {
    posts_count: 'Posts',
    impressions: 'Impressions',
    reach: 'Reach',
    likes: 'Likes',
    comments: 'Comments',
    engagement_rate: 'Engagement Rate',
  },
};

const requestPostsSummary = (
  profileId,
  profileService,
  dateRange,
  accessToken,
  analyzeApiAddr
) =>
  rp({
    uri: `${analyzeApiAddr}/metrics/post_totals`,
    method: 'POST',
    strictSSL: !(
      process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
    ),
    qs: {
      access_token: accessToken,
      start_date: dateRange.start,
      end_date: dateRange.end,
      profile_id: profileId,
    },
    json: true,
  });

const filterMetrics = metrics =>
  metrics.filter(metric => metric.label !== undefined);

const sortMetrics = (metrics, profileService) =>
  Object.values(LABELS[profileService]).map(label =>
    metrics.find(metric => metric.label === label)
  );

const percentageDifference = (value, pastValue) => {
  const difference = value - pastValue;
  return Math.ceil((difference / pastValue) * 100);
};

const summarize = (metric, currentPeriod, pastPeriod, profileService) => {
  const pastValue = pastPeriod[metric];
  const value = currentPeriod[metric];
  return {
    value,
    diff: percentageDifference(value, pastValue),
    label: LABELS[profileService][metric],
  };
};

function getResponseData(response) {
    return response && 'organic' in response ? response.organic : response;
}

module.exports = method(
  RPC_NAME,
  'fetch analytics posts summary for profiles and pages',
  ({ profileId, profileService, startDate, endDate }, req) => {
    const dateRange = new DateRange(startDate, endDate);
    const previousDateRange = dateRange.getPreviousDateRange();

    const currentPeriod = requestPostsSummary(
      profileId,
      profileService,
      dateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );
    const previousPeriod = requestPostsSummary(
      profileId,
      profileService,
      previousDateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );

    return Promise.all([currentPeriod, previousPeriod]).then(response => {
      const currentPeriodResult = getResponseData(response[0].response);
      const pastPeriodResult = getResponseData(response[1].response);
      const metrics = Object.keys(currentPeriodResult);
      return sortMetrics(
        filterMetrics(
          metrics.map(metric =>
            summarize(
              metric,
              currentPeriodResult,
              pastPeriodResult,
              profileService
            )
          )
        ),
        profileService
      );
    });
  }
);
