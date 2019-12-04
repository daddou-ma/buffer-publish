export const settingsHeader = 'Your posting schedule for @joelgascoigne';
const onChange = () => {
  console.log('on-change');
}; // eslint-disable-line
const onRemoveTimeClick = () => {
  console.log('on-remove-time-click');
}; // eslint-disable-line

const times = [
  {
    value: {
      hours: 9,
      minutes: 41,
    },
    onChange,
    onRemoveTimeClick,
  },
  {
    value: {
      hours: 19,
      minutes: 0,
    },
    onChange,
    onRemoveTimeClick,
  },
];
export const days = [
  {
    dayName: 'Monday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Tuesday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Wednesday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Thursday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Friday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Saturday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Sunday',
    postingTimesTotal: times.length,
    times,
  },
];

export const timezones = [
  { label: 'Pacific/Midway', timezone: 'Pacific/Midway' },
  { label: 'America/Adak', timezone: 'America/Adak' },
  { label: 'America/Anchorage', timezone: 'America/Anchorage' },
  { label: 'Pacific/Gambier', timezone: 'Pacific/Gambier' },
  { label: 'America/Dawson_Creek', timezone: 'America/Dawson_Creek' },
  { label: 'Pacific/Auckland', timezone: 'Pacific/Auckland' },
  { label: 'Pacific/Chatham', timezone: 'Pacific/Chatham' },
];

export const profileTimezone = 'Pacific/Midway';

export const initialValues = {
  time: {
    hours: 14,
    minutes: 20,
  },
};
