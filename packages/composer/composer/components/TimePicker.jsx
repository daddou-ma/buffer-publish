/**
 * Simple time picker using selects. Works with 12/24h formats.
 *
 * This component is controlled through the time prop, and uses the onChange
 * callback in props to let its parent know of any change.
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Select from '../components/Select';

import styles from './css/TimePicker.css';

class TimePicker extends React.Component {
  static propTypes = {
    shouldUse24hTime: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    time: PropTypes.instanceOf(moment),
    timezone: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    time: moment(),
  };

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

    const timePickerClassName = this.props.className;

    return (
      <div className={timePickerClassName}>
        <Select
          onChange={this.onHourSelectChange}
          value={hour}
          className={styles.select}
        >
          {this.getHoursInDay().map(h => (
            <option value={h} key={h}>
              {this.leftPadTimeUnit(h)}
            </option>
          ))}
        </Select>

        <Select
          onChange={this.onMinSelectChange}
          value={min}
          className={styles.select}
        >
          {this.getMinutesInHour().map(m => (
            <option value={m} key={m}>
              {this.leftPadTimeUnit(m)}
            </option>
          ))}
        </Select>

        {shouldDisplayPeriodSelect && (
          <Select
            onChange={this.onPeriodSelectChange}
            value={dayPeriod}
            className={styles.select}
          >
            <option value="am">AM</option>
            <option value="pm">PM</option>
          </Select>
        )}
      </div>
    );
  }
}

export default TimePicker;
