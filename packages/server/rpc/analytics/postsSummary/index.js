const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const DateRange = require('../utils/DateRange');

const LABELS = {
  facebook: {
    posts_count: 'Posts',
    post_reach: 'Post Reach',
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
    impressions: 'Post Impressions',
    reach: 'Post Reach',
    likes: 'Post Likes',
    comments: 'Post Comments',
    engagement_rate: 'Engagement Rate',
  },
};

function shouldUseAnalyzeApi (profileService) {
  return profileService === 'instagram';
}

const requestPostsSummary = (profileId, profileService, dateRange, accessToken) =>
  rp({
    uri: (shouldUseAnalyzeApi(profileService) ?
      `${process.env.ANALYZE_API_ADDR}/metrics/post_totals` :
      `${process.env.API_ADDR}/1/profiles/${profileId}/analytics/posts_summary.json`
    ),
    method: (shouldUseAnalyzeApi(profileService) ?
      'POST' :
      'GET'
    ),
    strictSSL: !(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'),
    qs: {
      access_token: accessToken,
      start_date: dateRange.start,
      end_date: dateRange.end,
      profile_id: profileId,
    },
    json: true,
  });

const filterMetrics = metrics => metrics.filter(metric => metric.label !== undefined);

const sortMetrics = (metrics, profileService) => Object.values(LABELS[profileService]).map(
  label => metrics.find(metric => metric.label === label),
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

module.exports = method(
  'posts_summary',
  'fetch analytics posts summary for profiles and pages',
  ({ profileId, profileService, startDate, endDate }, { session }) => {
    const dateRange = new DateRange(startDate, endDate);
    const previousDateRange = dateRange.getPreviousDateRange();

    const currentPeriod = requestPostsSummary(
      profileId,
      profileService,
      dateRange,
      session.analyze.accessToken,
    );
    const previousPeriod = requestPostsSummary(
      profileId,
      profileService,
      previousDateRange,
      session.analyze.accessToken,
    );

    return Promise
      .all([currentPeriod, previousPeriod])
      .then((response) => {
        const currentPeriodResult = response[0].response;
        const pastPeriodResult = response[1].response;
        const metrics = Object.keys(currentPeriodResult);
        return sortMetrics(filterMetrics(metrics.map(metric =>
          summarize(metric, currentPeriodResult, pastPeriodResult, profileService),
        )), profileService);
      })
      .catch(() => []);
  },
);
