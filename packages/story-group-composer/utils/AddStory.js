import moment from 'moment-timezone';

export const getReadableDateFormat = ({ uses24hTime, scheduledAt, timezone }) => {
  const date = new Date(scheduledAt * 1000);
  const scheduledAtMoment = moment.tz(date, timezone);
  const readableFormat = uses24hTime ? 'MMM D, H:mm' : 'MMM D, h:mm A';
  return scheduledAtMoment.format(readableFormat);
};

export const getMomentTime = ({ scheduledAt, timezone }) => {
  let scheduledAtMoment = moment.unix(scheduledAt);
  if (timezone) {
    scheduledAtMoment = scheduledAtMoment.tz(timezone);
  }
  return scheduledAtMoment;
};
