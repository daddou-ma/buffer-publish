import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled, { css } from 'styled-components';

import {
  Button,
  Text,
} from '@bufferapp/components';

import {
  geyser,
  offWhite,
} from '@bufferapp/components/style/color';

import ArrowLeftIcon from '@bufferapp/components/Icon/Icons/ArrowLeftIcon';
import ArrowRightIcon from '@bufferapp/components/Icon/Icons/ArrowRightIcon';
import Month from './Month';

const DayHeaderListItem = styled.li`
  display: inline-block;
  text-decoration: none;
  width: 1.7rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  border-bottom: solid 1px ${geyser};
`;

const DayHeaderList = styled.ul`
  padding: 0;
  margin: 1rem;
  display: flex;
  justify-content: center;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  border-bottom: solid 1px ${geyser};
  text-align: center;
  background: ${offWhite};
`;

const ArrowLeft = styled.i`
  cursor: pointer;
  margin-left: 1rem;
`;

const ArrowRight = styled.i`
  cursor: pointer;
  margin-right: 1rem;
`;

const Container = styled.aside`
  display: none;
  margin-top: 1rem;
  border: solid 1px ${geyser};
  border-radius: 3px;

  ${props => props.isOpen && css`
    display: block;
  `}
`;

const MonthHeader = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
    <DayHeaderListItem key={day}>
      <Text size="extra-small">{day.charAt(0)}</Text>
    </DayHeaderListItem>
  ));

  return (
    <DayHeaderList>
      {days}
    </DayHeaderList>
  );
};

class Calendar extends Component {
  getHeader(unixTimestamp) {
    const currentMonth = moment.unix(unixTimestamp).format('MMMM YYYY');

    return (
      <Header>
        <Button noStyle onClick={() => this.previousMonth(unixTimestamp)}>
          <ArrowLeft><ArrowLeftIcon /></ArrowLeft>
        </Button>
        <Text size="extra-small">{currentMonth}</Text>
        <Button noStyle onClick={() => this.nextMonth(unixTimestamp)}>
          <ArrowRight><ArrowRightIcon /></ArrowRight>
        </Button>
      </Header>
    );
  }

  previousMonth (unixTimestamp) {
    const m = moment.unix(unixTimestamp);
    m.subtract(1, 'months');
    this.props.selectMonth(m.unix());
  }

  nextMonth (unixTimestamp) {
    const m = moment.unix(unixTimestamp);
    m.add(1, 'months');
    this.props.selectMonth(m.unix());
  }

  handleDayClick (timestamp) {
    const {
      startDate,
      focusStartDate,
      focusEndDate,
      // Actions
      selectStartDate,
      selectEndDate,
    } = this.props;

    const m = moment.unix(timestamp);
    const mStartDate = moment.unix(startDate);

    if (focusStartDate) {
      selectStartDate(timestamp);
    } else if (focusEndDate && (startDate === -1 || m.isAfter(mStartDate))) {
      selectEndDate(timestamp);
    }
  }

  render () {
    const {
      startDate,
      endDate,
      maxStartDate,
      maxEndDate,
      isOpen,
      currentMonth,
    } = this.props;

    const header = this.getHeader(currentMonth);

    return (
      <Container isOpen={isOpen}>
        {header}
        <MonthHeader />
        <Month
          handleDayClick={timestamp => this.handleDayClick(timestamp)}
          currentMonth={currentMonth}
          startDate={startDate}
          endDate={endDate}
          maxStartDate={maxStartDate}
          maxEndDate={maxEndDate}
        />
      </Container>
    );
  }
}

Calendar.defaultProps = {
  startDate: null,
  endDate: null,
};

Calendar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  focusStartDate: PropTypes.bool.isRequired,
  focusEndDate: PropTypes.bool.isRequired,
  currentMonth: PropTypes.number.isRequired,
  maxStartDate: PropTypes.number,
  maxEndDate: PropTypes.number,

  // Actions
  selectStartDate: PropTypes.func.isRequired,
  selectEndDate: PropTypes.func.isRequired,
  selectMonth: PropTypes.func.isRequired,
};

export default Calendar;
