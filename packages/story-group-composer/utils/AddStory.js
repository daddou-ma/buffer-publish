import moment from 'moment-timezone';

export const getReadableDateFormat = ({ uses24hTime, scheduledAt }) => {
  const readableFormat = uses24hTime ? 'MMM D, H:mm' : 'MMM D, h:mm A';
  return moment.unix(scheduledAt).format(readableFormat);
};
