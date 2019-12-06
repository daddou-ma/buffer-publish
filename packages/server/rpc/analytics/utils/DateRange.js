const moment = require('moment');

module.exports = class DateRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  getDaysInRangeCount() {
    const end = moment(this.end, 'MM/DD/YYYY');
    const start = moment(this.start, 'MM/DD/YYYY');
    return end.diff(start, 'days');
  }

  getDaysInRange() {
    const numDays = this.getDaysInRangeCount();
    const end = moment(this.end, 'MM/DD/YYYY');
    const start = moment(this.start, 'MM/DD/YYYY');

    const days = [start.valueOf()];
    for (let i = 1; i < numDays; i += 1) {
      days.push(
        moment(this.start, 'MM/DD/YYYY')
          .add(i, 'days')
          .valueOf()
      );
    }
    days.push(end.valueOf());

    return days;
  }

  getPreviousDateRange() {
    const daysInRange = this.getDaysInRangeCount() + 1;
    const end = moment(this.end, 'MM/DD/YYYY')
      .subtract(daysInRange, 'days')
      .format('MM/DD/YYYY');
    const start = moment(this.start, 'MM/DD/YYYY')
      .subtract(daysInRange, 'days')
      .format('MM/DD/YYYY');
    return new DateRange(start, end);
  }
};
