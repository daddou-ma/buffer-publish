import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import styled from 'styled-components';

import Day from './Day';

const Week = styled.div`
  padding: 0;
  margin: 1rem;
  display: flex;
  justify-content: center;
`;

const getFirstDayOfWeek = (timestamp) => {
  const startOfMonth = moment.unix(timestamp).startOf('month');
  const dayOfWeek = startOfMonth.day();

  if (dayOfWeek !== 1) {
    const daysFromMonday = dayOfWeek - 1;
    startOfMonth.subtract(daysFromMonday, 'days');
  }

  return startOfMonth.unix();
};

const isInValidRange = (start, end, timestamp) => {
  if (start === null) {
    return true;
  }
  const date = moment.unix(timestamp);

  // start date should always be inclusive
  const maxStartDate = moment(start).subtract(1, 'days');
  const maxEndDate = moment(end);

  return date.isBetween(maxStartDate, maxEndDate);
};

const isInRange = (start, end, timestamp) => {
  const startDate = moment.unix(start);
  const endDate = moment.unix(end);
  const date = moment.unix(timestamp);

  if (startDate.isSame(date, 'day')) {
    return -1;
  } else if (date.isBetween(startDate, endDate) && start !== null && end !== null) {
    return 0;
  } else if (endDate.isSame(date, 'day')) {
    return 1;
  }

  return false;
};

const isSelectedBetween = (start, end, timestamp) => isInRange(start, end, timestamp) === 0;
const isSelectedStart = (start, end, timestamp) => isInRange(start, end, timestamp) === -1;
const isSelectedEnd = (start, end, timestamp) => isInRange(start, end, timestamp) === 1;

class Month extends Component {
  componentDidUpdate(nextProps) {
    if (this.props.currentMonth !== nextProps.currentMonth) {
      ReactTooltip.rebuild();
    }
  }

  getDays(weekList) {
    const handleDayClick = this.props.handleDayClick;

    return weekList.map(day => (
      <Day
        {...day}
        key={day.timestamp}
        handleClick={handleDayClick}
      />
    ));
  }

  getMonth (unixTimestamp) {
    const {
      startDate,
      endDate,
      maxStartDate,
      maxEndDate,
    } = this.props;

    const monthGrid = this.formatMonth(unixTimestamp, startDate, endDate, maxStartDate, maxEndDate);

    return monthGrid.map((weekList) => {
      const days = this.getDays(weekList);
      return (
        <Week key={weekList[0].timestamp}>
          {days}
        </Week>
      );
    });
  }

  formatMonth(unixTimestamp) {
    const month = moment.unix(unixTimestamp).startOf('month').month();
    const year = moment.unix(unixTimestamp).year();
    const m = moment.unix(getFirstDayOfWeek(unixTimestamp));
    const grid = [[]];

    const {
      startDate,
      endDate,
      maxStartDate,
      maxEndDate,
    } = this.props;

    let endOfMonthGrid = false;
    let endOfWeek = false;
    let endOfMonth = false;

    const mMaxStartDate = moment(maxStartDate);

    while (!endOfMonthGrid) {
      const weekIndex = grid.length - 1;

      const showTooltip = m.isBefore(mMaxStartDate);

      grid[weekIndex].push({
        timestamp: m.unix(),
        day: m.date(),
        today: m.isSame(moment(), 'day'),
        inMonth: m.month() === month,
        selectedBetween: isSelectedBetween(startDate, endDate, m.unix()),
        selectedStart: isSelectedStart(startDate, endDate, m.unix()),
        selectedEnd: isSelectedEnd(startDate, endDate, m.unix()),
        isDisabled: !isInValidRange(maxStartDate, maxEndDate, m.unix()),
        disabledText: showTooltip ? `We don't have data prior to ${mMaxStartDate.format('MM/DD/YY')}` : '',
        startDate,
        endDate,
      });

      endOfWeek = m.day() === 0;
      endOfMonth = m.month() > month || m.year() > year;

      if (endOfWeek && endOfMonth) {
        endOfMonthGrid = true;
      } else if (endOfWeek) {
        grid.push([]);
      }

      m.add(1, 'day');
    }

    return grid;
  }

  render () {
    const {
      currentMonth,
    } = this.props;

    return (
      <div>
        {this.getMonth(currentMonth)}
      </div>
    );
  }
}

Month.defaultProps = {
  startDate: null,
  endDate: null,
};

Month.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  maxStartDate: PropTypes.number.isRequired,
  maxEndDate: PropTypes.number.isRequired,
  // Actions
  handleDayClick: PropTypes.func.isRequired,
};

export default Month;
