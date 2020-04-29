/**
 * Simple time picker using selects. Works with 12/24h formats.
 *
 * This component is controlled through the time prop, and uses the onChange
 * callback in props to let its parent know of any change.
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import styled from 'styled-components';
import Select from './shared/Select';

const TimeSelect = styled(Select)`
  display: inline-block;
  margin: 0 2px;
`;

const SlotTimePicker = styled.div`
  margin-top: 16px;
`;

const TimeDigitSelector = ({
  onChange,
  getOptions,
  currentOption,
  formatter,
}) => (
  <TimeSelect onChange={onChange} value={currentOption}>
    {getOptions().map(d => (
      <option value={d} key={d}>
        {formatter(d)}
      </option>
    ))}
  </TimeSelect>
);

TimeDigitSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  getOptions: PropTypes.func.isRequired,
  currentOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  formatter: PropTypes.func.isRequired,
};

class TimePicker extends React.Component {
  onHourSelectChange = e => {
    this.onChange({ hour: e.target.value });
  };

  onMinSelectChange = e => {
    this.onChange({ min: e.target.value });
  };

  onPeriodSelectChange = e => {
    this.onChange({ dayPeriod: e.target.value });
  };

  /**
   * Moment exposes methods to update a time's hours and minutes, but not day period,
   * so we're using the string parsing method instead
   */
  onChange = newTimeUnits => {
    const timeFormats = this.getTimeFormats();
    const timeUnits = this.getTimeUnits();

    const dateFormat = 'YYYY M D';
    const formattedDate = this.props.time.format(dateFormat);

    const hour =
      typeof newTimeUnits.hour !== 'undefined'
        ? newTimeUnits.hour
        : timeUnits.hour;
    const min =
      typeof newTimeUnits.min !== 'undefined'
        ? newTimeUnits.min
        : timeUnits.min;
    const dayPeriod =
      typeof newTimeUnits.dayPeriod !== 'undefined'
        ? newTimeUnits.dayPeriod
        : timeUnits.dayPeriod;

    const momentParams = [
      `${formattedDate} ${hour} ${min} ${dayPeriod}`,
      `${dateFormat} ${timeFormats.hour} ${timeFormats.min} ${timeFormats.dayPeriod}`,
    ];

    const time = this.props.timezone
      ? moment.tz(...momentParams, this.props.timezone)
      : moment(...momentParams);

    this.props.onChange(time);
  };

  getHoursInDay = () =>
    this.props.shouldUse24hTime
      ? [...Array(24).keys()] // [0..23]
      : [...Array(12 + 1).keys()].slice(1); // [1..12]

  getMinutesInHour = () => [...Array(60).keys()]; // [0..59]

  getTimeFormats = () => ({
    hour: this.props.shouldUse24hTime ? 'H' : 'h',
    min: 'm',
    dayPeriod: this.props.shouldUse24hTime ? ' ' : 'a',
  });

  getTimeUnits = () => {
    const timeFormats = this.getTimeFormats();

    return {
      hour: this.props.time.format(timeFormats.hour),
      min: this.props.time.format(timeFormats.min),
      dayPeriod: this.props.time.format(timeFormats.dayPeriod),
    };
  };

  leftPadTimeUnit = timeUnit => (timeUnit < 10 ? `0${timeUnit}` : timeUnit);

  render() {
    const { shouldUse24hTime } = this.props;
    const shouldDisplayPeriodSelect = !shouldUse24hTime;

    const { hour, min, dayPeriod } = this.getTimeUnits();

    return (
      <SlotTimePicker>
        <TimeDigitSelector
          onChange={this.onHourSelectChange}
          currentOption={hour}
          getOptions={this.getHoursInDay}
          formatter={this.leftPadTimeUnit}
        />
        <TimeDigitSelector
          onChange={this.onMinSelectChange}
          currentOption={min}
          getOptions={this.getMinutesInHour}
          formatter={this.leftPadTimeUnit}
        />
        {shouldDisplayPeriodSelect && (
          <TimeDigitSelector
            onChange={this.onPeriodSelectChange}
            currentOption={dayPeriod}
            getOptions={() => ['am', 'pm']}
            formatter={v => v.toUpperCase()}
          />
        )}
      </SlotTimePicker>
    );
  }
}

TimePicker.propTypes = {
  shouldUse24hTime: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  time: PropTypes.instanceOf(moment),
  timezone: PropTypes.string,
};

TimePicker.defaultProps = {
  time: moment(),
};

export default TimePicker;
