const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const DateRange = require('../utils/DateRange');

// This also also used to filter down the metrics to return
const LABELS = {
  twitter: {
    posts_count: 'Posts',
    retweets: 'Retweets',
    impressions: 'Impressions',
    engagements: 'Engagements',
    replies: 'Replies',
    url_clicks: 'Clicks',
    favorites: 'Likes',
    new_followers: 'New Followers',
  },
  facebook: {
    engaged_users: 'Engaged Users',
    post_impressions: 'Post Impressions',
    reactions: 'Reactions',
    post_reach: 'Post Reach',
    page_engagements: 'Page & Post Engagements',
    post_clicks: 'Link Clicks',
    new_followers: 'New Fans',
    posts_count: 'Posts',
  },
  instagram: {
    posts_count: 'Posts',
    impressions: 'Impressions',
    reach: 'Reach',
    likes: 'Likes',
    comments: 'Comments',
    new_followers: 'New Followers',
  },
};

const requestTotals = (
  profileId,
  profileService,
  dateRange,
  accessToken,
  analyzeApiAddr
) =>
  rp({
    uri: `${analyzeApiAddr}/metrics/totals`,
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

const percentageDifference = (value, pastValue) => {
  const difference = value - pastValue;
  return Math.ceil((difference / pastValue) * 100);
};

const summarize = (metricKey, currentPeriod, pastPeriod, profileService) => {
  const pastValue = pastPeriod[metricKey];
  const value = currentPeriod[metricKey];
  return {
    value,
    diff: percentageDifference(value, pastValue),
    label: LABELS[profileService][metricKey],
  };
};

module.exports = method(
  'summary',
  'fetch analytics summary for profiles and pages',
  ({ profileId, profileService, startDate, endDate }, req) => {
    const dateRange = new DateRange(startDate, endDate);
    const previousDateRange = dateRange.getPreviousDateRange();

    const currentPeriod = requestTotals(
      profileId,
      profileService,
      dateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );
    const previousPeriod = requestTotals(
      profileId,
      profileService,
      previousDateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );

    return Promise.all([currentPeriod, previousPeriod])
      .then(response => {
        const currentPeriodResult = response[0].response;
        const pastPeriodResult = response[1].response;
        return Object.keys(LABELS[profileService])
          .map(metricKey =>
            summarize(
              metricKey,
              currentPeriodResult,
              pastPeriodResult,
              profileService
            )
          )
          .filter(metric => metric.label !== undefined);
      })
      .catch(() => []);
  }
);
