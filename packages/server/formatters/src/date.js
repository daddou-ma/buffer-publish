const moment = require('moment-timezone');

const getOrdinalSuffix = dayNumber => {
  const possibleSuffix = [false, 'st', 'nd', 'rd'];
  const overTwentyOnesDigit =
    ((dayNumber = Math.abs(dayNumber % 100)) - 20) % 10;
  return (
    possibleSuffix[overTwentyOnesDigit] || possibleSuffix[dayNumber] || 'th'
  );
};

const isToday = ({ date, profileTimezone }) => {
  const today = new Date();
  const todayAsMoment = moment.tz(today, profileTimezone);
  const inputDateAsMoment = moment.tz(date, profileTimezone);

  return (
    todayAsMoment.format('YYYY-MM-DD') ===
    inputDateAsMoment.format('YYYY-MM-DD')
  );
};

const daysSinceDate = ({ date, profileTimezone }) => {
  const today = new Date();
  const todayAsMoment = moment.tz(today, profileTimezone);
  const inputDateAsMoment = moment.tz(date, profileTimezone);
  const days = todayAsMoment.diff(inputDateAsMoment, 'days');

  return days;
};

module.exports = {
  getDateString: (unconvertedDate, profileTimezone, options) => {
    options = options || {};
    const date = new Date(unconvertedDate * 1000);
    const scheduledAtMoment = moment.tz(date, profileTimezone);
    const monthName = scheduledAtMoment.format('MMMM');
    const day = scheduledAtMoment.date();
    const ordinalSuffix = getOrdinalSuffix(day);
    let time;
    if (options.twentyFourHourTime) {
      time = scheduledAtMoment.format('HH:mm');
    } else {
      time = scheduledAtMoment.format('h:mm A');
    }
    const zone = scheduledAtMoment.zoneAbbr();
    const timeString = `at ${time} (${zone})`;

    if (isToday({ date, profileTimezone })) {
      return `today ${timeString}`;
    } else if (
      options.createdAt &&
      daysSinceDate({ date, profileTimezone }) >= 3
    ) {
      return `on ${monthName} ${day}${ordinalSuffix}`;
    }
    return `${monthName} ${day}${ordinalSuffix}${
      options.isPastDue ? '' : ` ${timeString}`
    }`;
  },
  isInThePast: unconvertedDate => {
    if (!unconvertedDate) return false;
    const date = new Date(unconvertedDate * 1000);
    const now = new Date();
    return date < now;
  },
  daysAgoTimestamp: days => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return Math.ceil(date.getTime() / 1000);
  },
};
