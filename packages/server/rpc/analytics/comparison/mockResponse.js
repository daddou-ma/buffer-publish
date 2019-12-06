import moment from 'moment';

const day1 = moment()
  .subtract(1, 'days')
  .startOf('day')
  .valueOf();
const day2 = moment()
  .subtract(2, 'days')
  .startOf('day')
  .valueOf();
const day3 = moment()
  .subtract(3, 'days')
  .startOf('day')
  .valueOf();
const day4 = moment()
  .subtract(4, 'days')
  .startOf('day')
  .valueOf();
const day5 = moment()
  .subtract(5, 'days')
  .startOf('day')
  .valueOf();
const day6 = moment()
  .subtract(6, 'days')
  .startOf('day')
  .valueOf();
const day7 = moment()
  .subtract(7, 'days')
  .startOf('day')
  .valueOf();

export const response = {
  response: {
    profile1234: {
      audience: {
        profileTotals: {
          currentPeriodDiff: 20,
          currentPeriodTotal: 1000,
          profileId: 'profile1234',
          service: 'facebook',
          username: 'Buffer',
        },
        profilesMetricData: {
          dailyData: [
            {
              day: day1,
              value: 50,
            },
            {
              day: day3,
              value: 100,
            },
          ],
          service: 'facebook',
          timezone: 'America/New_York',
        },
      },
    },
    profile134B: {
      audience: {
        profileTotals: {
          currentPeriodDiff: 0,
          currentPeriodTotal: 0,
          profileId: 'profile134B',
          service: 'facebook',
          username: 'Buffer',
        },
        profilesMetricData: {
          dailyData: [],
          service: 'facebook',
          timezone: 'America/New_York',
        },
      },
    },
  },
};

function getParsedResponse(label) {
  return {
    profileTotals: [
      {
        currentPeriodDiff: 20,
        currentPeriodTotal: 1000,
        metric: {
          color: '#53CBB0',
          label,
        },
        profileId: 'profile1234',
        username: 'Buffer',
        service: 'facebook',
      },
      {
        currentPeriodDiff: 0,
        currentPeriodTotal: 0,
        metric: {
          color: '#168EEA',
          label,
        },
        profileId: 'profile134B',
        username: 'Buffer',
        service: 'facebook',
      },
    ],

    profilesMetricData: [
      {
        dailyData: [
          {
            day: day7,
            metric: {
              color: '#53CBB0',
              value: null,
              label,
            },
          },
          {
            day: day6,
            metric: {
              color: '#53CBB0',
              value: null,
              label,
            },
          },
          {
            day: day5,
            metric: {
              color: '#53CBB0',
              value: null,
              label,
            },
          },
          {
            day: day4,
            metric: {
              color: '#53CBB0',
              value: null,
              label,
            },
          },
          {
            day: day3,
            metric: {
              color: '#53CBB0',
              value: 100,
              label,
            },
          },
          {
            day: day2,
            metric: {
              color: '#53CBB0',
              value: null,
              label,
            },
          },
          {
            day: day1,
            metric: {
              color: '#53CBB0',
              value: 50,
              label,
            },
          },
        ],
        profileId: 'profile1234',
      },
      {
        dailyData: [
          {
            day: day7,
            metric: {
              color: '#168EEA',
              value: null,
              label,
            },
          },
          {
            day: day6,
            metric: {
              color: '#168EEA',
              value: null,
              label,
            },
          },
          {
            day: day5,
            metric: {
              color: '#168EEA',
              value: null,
              label,
            },
          },
          {
            day: day4,
            metric: {
              color: '#168EEA',
              value: null,
              label,
            },
          },
          {
            day: day3,
            metric: {
              color: '#168EEA',
              value: null,
              label,
            },
          },
          {
            day: day2,
            metric: {
              color: '#168EEA',
              value: null,
              label,
            },
          },
          {
            day: day1,
            metric: {
              color: '#168EEA',
              value: null,
              label,
            },
          },
        ],
        profileId: 'profile134B',
      },
    ],
  };
}

export const rpcFinalResponse = {
  audience: getParsedResponse('Fans'),
};
