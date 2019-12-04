const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const DateRange = require('../utils/DateRange');

// We are using this to filter down the metrics we want
const LABELS = {
  // Facebook metrics
  facebook: {
    post_impressions: 'Daily average impressions',
    page_engagements: 'Daily average engagements',
    post_clicks: 'Daily average clicks',
  },
  // Twitter metrics
  twitter: {
    impressions: 'Average impressions per tweet',
    engagements: 'Average engagements per tweet',
    url_clicks: 'Average clicks per tweet',
  },
  // Instagram metrics
  instagram: {
    impressions: 'Daily average impressions',
    likes: 'Average likes per post',
    comments: 'Average comments per post',
  },
};

const METRIC_KEY_LABELS = {
  // Facebook metrics
  facebook: {
    post_impressions: 'impressions',
    page_engagements: 'engagements',
    post_clicks: 'clicks',
  },
  // Twitter metrics
  twitter: {
    impressions: 'impressions',
    engagements: 'engagements',
    url_clicks: 'clicks',
  },
  // Instagram metrics
  instagram: {
    impressions: 'impressions',
    likes: 'likes',
    comments: 'comments',
  },
};

function shouldUseDaysAsAverageQuantity(profileService, metric) {
  return (
    profileService === 'facebook' ||
    (profileService === 'instagram' && metric === 'impressions')
  );
}

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

const requestDailyTotals = (
  profileId,
  profileService,
  dateRange,
  accessToken,
  analyzeApiAddr
) =>
  rp({
    uri: `${analyzeApiAddr}/metrics/daily_totals`,
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

function percentageDifference(value, pastValue) {
  if (pastValue === 0 && value === 0) return 0;
  const difference = value - pastValue;
  if (pastValue === 0) pastValue = 1; // can't divide by 0
  return Math.ceil((difference / pastValue) * 100);
}

function averageValue(value, quantity) {
  if (value === 0) return 0;
  if (quantity === 0) quantity = 1; // can't divide by 0
  return Math.round(value / quantity);
}

const summarize = (
  metricKey,
  profileService,
  currentPeriod,
  currentPeriodPostCount,
  pastPeriod,
  pastPeriodPostCount,
  daysCount
) => {
  let currentPeriodQuantity = currentPeriodPostCount;
  let pastPeriodQuantity = pastPeriodPostCount;
  // for facebook & IG impressions we calculate the average by
  // sum (metric per day) / number_of_days
  if (daysCount && shouldUseDaysAsAverageQuantity(profileService, metricKey)) {
    currentPeriodQuantity = daysCount;
    pastPeriodQuantity = daysCount;
  }
  const pastValue = averageValue(pastPeriod[metricKey], pastPeriodQuantity);
  const value = averageValue(currentPeriod[metricKey], currentPeriodQuantity);
  const label = LABELS[profileService][metricKey];
  if (label) {
    return {
      diff: percentageDifference(value, pastValue),
      label: LABELS[profileService][metricKey],
      value,
      metricKey: METRIC_KEY_LABELS[profileService][metricKey],
    };
  }
  return null;
};

function formatTotals(
  currentPeriodResult,
  currentPeriodPostCount,
  pastPeriodResult,
  pastPeriodPostCount,
  profileService,
  daysCount
) {
  return Object.keys(currentPeriodResult)
    .map(metricKey =>
      summarize(
        metricKey,
        profileService,
        currentPeriodResult,
        currentPeriodPostCount,
        pastPeriodResult,
        pastPeriodPostCount,
        daysCount
      )
    )
    .filter(metric => metric !== null);
}

function formatDaily(
  currentPeriodDailyTotalsResult,
  pastPeriodDailyTotalsResult,
  profileService
) {
  const currentPeriodDays = Object.keys(currentPeriodDailyTotalsResult);
  const pastPeriodDays = Object.keys(pastPeriodDailyTotalsResult);
  const daily = Array.from(currentPeriodDays, (day, index) => ({
    day,
    currentPeriodMetrics: currentPeriodDailyTotalsResult[day],
    pastPeriodMetrics: pastPeriodDailyTotalsResult[pastPeriodDays[index]],
    currentPeriodPostCount: currentPeriodDailyTotalsResult[day].posts_count,
    pastPeriodPostCount:
      pastPeriodDailyTotalsResult[pastPeriodDays[index]].posts_count,
  })).map(data => {
    const dailyMetrics = Object.keys(data.currentPeriodMetrics);
    return {
      day: data.day,
      metrics: dailyMetrics
        .map(metricKey =>
          summarize(
            metricKey,
            profileService,
            data.currentPeriodMetrics,
            data.currentPeriodPostCount,
            data.pastPeriodMetrics,
            data.pastPeriodPostCount
          )
        )
        .filter(metric => metric !== null),
    };
  });
  return daily;
}

function formatData(
  currentPeriodResult,
  currentPeriodPostCount,
  pastPeriodResult,
  pastPeriodPostCount,
  currentPeriodDailyTotalsResult,
  pastPeriodDailyTotalsResult,
  profileService
) {
  const daysCount = Object.keys(currentPeriodDailyTotalsResult).length;
  const totals = formatTotals(
    currentPeriodResult,
    currentPeriodPostCount,
    pastPeriodResult,
    pastPeriodPostCount,
    profileService,
    daysCount
  );

  const daily = formatDaily(
    currentPeriodDailyTotalsResult,
    pastPeriodDailyTotalsResult,
    profileService
  );

  return {
    totals,
    daily,
  };
}

module.exports = method(
  'average',
  'fetch analytics average for profiles and pages',
  ({ profileId, profileService, startDate, endDate }, req) => {
    const dateRange = new DateRange(startDate, endDate);
    const pastDateRange = dateRange.getPreviousDateRange();

    const currentPeriodTotals = requestTotals(
      profileId,
      profileService,
      dateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );
    const pastPeriodTotals = requestTotals(
      profileId,
      profileService,
      pastDateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );

    const currentPeriodDailyTotals = requestDailyTotals(
      profileId,
      profileService,
      dateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );
    const pastPeriodDailyTotals = requestDailyTotals(
      profileId,
      profileService,
      pastDateRange,
      req.session.publish.accessToken,
      req.app.get('analyzeApiAddr')
    );

    return Promise.all([
      currentPeriodTotals,
      pastPeriodTotals,
      currentPeriodDailyTotals,
      pastPeriodDailyTotals,
    ])
      .then(response => {
        const currentPeriodTotalsResult = response[0].response;
        const pastPeriodTotalsResult = response[1].response;
        const currentPeriodTotalsPostCount =
          currentPeriodTotalsResult.posts_count;
        const pastPeriodTotalsPostCount = pastPeriodTotalsResult.posts_count;

        const currentPeriodDailyTotalsResult = response[2].response;
        const pastPeriodDailyTotalsResult = response[3].response;

        return formatData(
          currentPeriodTotalsResult,
          currentPeriodTotalsPostCount,
          pastPeriodTotalsResult,
          pastPeriodTotalsPostCount,
          currentPeriodDailyTotalsResult,
          pastPeriodDailyTotalsResult,
          profileService
        );
      })
      .catch(() => ({
        totals: [],
        daily: [],
      }));
  }
);
