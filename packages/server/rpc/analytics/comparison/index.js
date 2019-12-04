const { method } = require('@bufferapp/micro-rpc');
const rp = require('request-promise');
const DateRange = require('../utils/DateRange');

const METRIC_KEYS = ['audience', 'reach', 'likes', 'engagement', 'comments'];

const PROFILE_COLORS = ['#53CBB0', '#168EEA', '#C53DD2', '#E53C5F', '#F2994A'];

const METRIC_CONFIGS_BY_KEY = {
  audience: {
    facebook: {
      label: 'Fans',
    },
    instagram: {
      label: 'Followers',
    },
    twitter: {
      label: 'Followers',
    },
  },
  reach: {
    facebook: {
      label: 'Impressions',
    },
    instagram: {
      label: 'Impressions',
    },
    twitter: {
      label: 'Impressions',
    },
  },
  likes: {
    facebook: {
      label: 'Likes',
    },
    instagram: {
      label: 'Likes',
    },
    twitter: {
      label: 'Likes',
    },
  },
  engagement: {
    facebook: {
      label: 'Engagements',
    },
    instagram: {
      label: 'Engagements',
    },
    twitter: {
      label: 'Engagements',
    },
  },
  comments: {
    facebook: {
      label: 'Comments',
    },
    instagram: {
      label: 'Comments',
    },
    twitter: {
      label: 'Comments',
    },
  },
};

const formatDailyData = (
  day,
  value,
  profileService,
  metricKey,
  profileIndex
) => {
  const label = METRIC_CONFIGS_BY_KEY[metricKey][profileService].label;
  const color = PROFILE_COLORS[profileIndex];
  return {
    day,
    metric: {
      label,
      value,
      color,
    },
  };
};

function getDailyData(days, data, metricKey, profileIndex) {
  return days.map(day => {
    const dailyData = data.dailyData.find(d => d.day === day);
    return formatDailyData(
      day,
      dailyData ? dailyData.value : null,
      data.service,
      metricKey,
      profileIndex
    );
  });
}

function formatData(rawData, metricKey, dateRange) {
  const profileIds = Object.keys(rawData);

  const profilesMetricData = Array.from(profileIds, id => {
    const data = rawData[id];
    if (data[metricKey] === undefined) return null;
    return Object.assign({ profileId: id }, data[metricKey].profilesMetricData);
  }).filter(e => e !== null);

  const profileTotals = Array.from(profileIds, id => {
    const data = rawData[id];
    if (data[metricKey] === undefined) return null;
    return data[metricKey].profileTotals;
  }).filter(e => e !== null);

  if (profilesMetricData.length === 0) return null;

  const days = dateRange.getDaysInRange();

  const formattedProfilesMetricData = Array.from(
    profilesMetricData,
    (data, profileIndex) => ({
      profileId: data.profileId,
      dailyData: getDailyData(days, data, metricKey, profileIndex),
    })
  );

  const formattedProfileTotals = Array.from(
    profileTotals,
    (data, profileIndex) => {
      const label = METRIC_CONFIGS_BY_KEY[metricKey][data.service].label;
      const color = PROFILE_COLORS[profileIndex];
      return {
        metric: {
          label,
          color,
        },
        currentPeriodTotal: data.currentPeriodTotal,
        currentPeriodDiff: data.currentPeriodDiff,
        profileId: data.profileId,
        username: data.username,
        service: data.service,
      };
    }
  );

  return {
    profilesMetricData: formattedProfilesMetricData,
    profileTotals: formattedProfileTotals,
  };
}

function parseResponse(response, dateRange) {
  const metricsData = METRIC_KEYS.map(metric =>
    formatData(response, metric, dateRange)
  );
  const metrics = {};
  METRIC_KEYS.forEach((metricKey, index) => {
    const data = metricsData[index];
    if (data !== null) metrics[metricKey] = data;
  });
  return {
    metrics,
  };
}

module.exports = method(
  'comparison',
  'get daily comparison data for the given profiles',
  ({ profileIds, startDate, endDate }, req) => {
    const dateRange = new DateRange(startDate, endDate);
    return rp({
      uri: `${req.app.get('analyzeApiAddr')}/comparison`,
      method: 'POST',
      strictSSL: !(
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ),
      body: {
        profiles: profileIds,
        start_date: dateRange.start,
        end_date: dateRange.end,
        metrics: METRIC_KEYS,
      },
      json: true,
    })
      .then(({ response }) => parseResponse(response, dateRange))
      .catch(() => {});
  }
);
