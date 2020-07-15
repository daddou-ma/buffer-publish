const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const DateRange = require('../utils/DateRange');
const METRICS_CONFIG = require('./metricsConfig');
const NON_SUMMABLE_METRICS = ['followers'];
const METRICS_TO_AVERAGE = ['engagement_rate'];

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

function percentageDifference(value, previousValue) {
  if (previousValue === 0 && value === 0) return 0;
  const difference = value - previousValue;
  if (previousValue === 0) previousValue = 1; // can't divide by 0
  return Math.ceil((difference / previousValue) * 100);
}

const summarize = (
  metricKey,
  currentPeriod,
  currentPeriodPostCount,
  previousPeriod,
  previousPeriodPostCount,
  profileService
) => {
  const previousValue = previousPeriod[metricKey] || 0;
  const value = currentPeriod[metricKey] || 0;
  const label = METRICS_CONFIG[profileService].config[metricKey].label;
  if (label) {
    return {
      key: metricKey,
      diff: percentageDifference(value, previousValue),
      label,
      color: METRICS_CONFIG[profileService].config[metricKey].color,
      value,
      previousValue,
      postsCount: currentPeriodPostCount,
      previousPostsCount: previousPeriodPostCount,
    };
  }
  return null;
};

function formatTotals(
  currentPeriodResult,
  previousPeriodResult,
  profileService
) {
  const currentPeriodTotalPostCount = currentPeriodResult.posts_count;
  const previousPeriodTotalPostCount = previousPeriodResult.posts_count;
  return METRICS_CONFIG[profileService].orderedKeys
    .map(metricKey =>
      summarize(
        metricKey,
        currentPeriodResult,
        currentPeriodTotalPostCount,
        previousPeriodResult,
        previousPeriodTotalPostCount,
        profileService
      )
    )
    .filter(metric => metric !== null);
}

function formatDaily(currentPeriodDaily, previousPeriodDaily, profileService) {
  const currentPeriodDays = Object.keys(currentPeriodDaily);
  const previousPeriodDays = Object.keys(previousPeriodDaily);
  const daily = Array.from(currentPeriodDays, (day, index) => ({
    day,
    previousPeriodDay: previousPeriodDays[index]
      ? previousPeriodDays[index]
      : null,
    currentPeriodMetrics: currentPeriodDaily[day],
    previousPeriodMetrics: previousPeriodDays[index]
      ? previousPeriodDaily[previousPeriodDays[index]]
      : null,
    currentPeriodPostCount: currentPeriodDaily[day].posts_count,
    previousPeriodPostCount: previousPeriodDays[index]
      ? previousPeriodDaily[previousPeriodDays[index]].posts_count
      : null,
  }))
    .filter(data => data.previousPeriodDay !== null)
    .map(data => {
      const metricKeys = METRICS_CONFIG[profileService].orderedKeys;
      return {
        day: data.day,
        previousPeriodDay: data.previousPeriodDay,
        metrics: metricKeys
          .map(metricKey =>
            summarize(
              metricKey,
              data.currentPeriodMetrics,
              data.currentPeriodPostCount,
              data.previousPeriodMetrics,
              data.previousPeriodPostCount,
              profileService
            )
          )
          .filter(metric => metric !== null),
      };
    });
  return daily;
}

function getTotalsFromDaily(dailyData) {
  const currentPeriodTotals = {};
  const previousPeriodTotals = {};
  const currentMetricsToAveragEntriesCount = {};
  const previousMetricsToAveragEntriesCount = {};
  dailyData.forEach(day => {
    day.metrics.forEach(metric => {
      if (!currentPeriodTotals[metric.key]) {
        currentPeriodTotals[metric.key] = 0;
        previousPeriodTotals[metric.key] = 0;
        currentMetricsToAveragEntriesCount[metric.key] = 0;
        previousMetricsToAveragEntriesCount[metric.key] = 0;
      }

      if (NON_SUMMABLE_METRICS.indexOf(metric.key) !== -1) {
        currentPeriodTotals[metric.key] = metric.value;
        previousPeriodTotals[metric.key] = metric.previousValue;
      } else {
        currentPeriodTotals[metric.key] += metric.value;
        previousPeriodTotals[metric.key] += metric.previousValue;
      }

      if (METRICS_TO_AVERAGE.indexOf(metric.key) !== -1) {
        if (metric.value > 0) {
          currentMetricsToAveragEntriesCount[metric.key] += 1;
        }
        if (metric.previousValue > 0) {
          previousMetricsToAveragEntriesCount[metric.key] += 1;
        }
      }
    });
  });

  METRICS_TO_AVERAGE.forEach(metricKey => {
    currentPeriodTotals[metricKey] /=
      currentMetricsToAveragEntriesCount[metricKey];
    previousPeriodTotals[metricKey] /=
      previousMetricsToAveragEntriesCount[metricKey];
  });
  return { currentPeriodTotals, previousPeriodTotals };
}

function formatData(currentPeriodDaily, previousPeriodDaily, profileService) {
  const daily = formatDaily(
    currentPeriodDaily,
    previousPeriodDaily,
    profileService
  );

  const { currentPeriodTotals, previousPeriodTotals } = getTotalsFromDaily(
    daily
  );
  const totals = formatTotals(
    currentPeriodTotals,
    previousPeriodTotals,
    profileService
  );

  return {
    totals,
    daily,
  };
}

function getResponseData(response) {
    return response && 'organic' in response ? response.organic : response;
}

module.exports = method(
  'compare',
  'fetch analytics compare for profiles and pages',
  ({ profileId, profileService, startDate, endDate }, req) => {
    const dateRange = new DateRange(startDate, endDate);
    const previousDateRange = dateRange.getPreviousDateRange();
    const accessToken = req.session.publish.accessToken;
    const analyzeApiAddr = req.app.get('analyzeApiAddr');

    const currentPeriodDailyTotals = requestDailyTotals(
      profileId,
      profileService,
      dateRange,
      accessToken,
      analyzeApiAddr
    );
    const previousPeriodDailyTotals = requestDailyTotals(
      profileId,
      profileService,
      previousDateRange,
      accessToken,
      analyzeApiAddr
    );

    return Promise.all([currentPeriodDailyTotals, previousPeriodDailyTotals])
      .then(response => {
        const currentPeriodDaily = getResponseData(response[0].response);
        const previousPeriodDaily = getResponseData(response[1].response);

        return formatData(
          currentPeriodDaily,
          previousPeriodDaily,
          profileService
        );
      })
      .catch(() => ({
        totals: [],
        daily: [],
      }));
  }
);
