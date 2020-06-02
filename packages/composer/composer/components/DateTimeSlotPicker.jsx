/**
 * Date + time picker combo!
 *
 * DateTimeSlotPicker is timezone-aware, and works with 12/24h formats. If the
 * component is passed a different timezone through props after it's been
 * mounted, it'll update the date and time to that new timezone and go on with
 * its business. The component also ensures the selected date and time are in
 * the future, no matter the timezone.
 *
 * This component is uncontrolled (except for the timezone prop), and uses the
 * onSubmit callback in props to let its parent know of any scheduling action.
 */

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { InputDate } from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import Select from './shared/Select';

import TimePicker from './TimePicker';
import SlotPicker from './SlotPicker';

const DateTimePicker = styled.div`
  padding: 10px 16px;
  text-align: center;
`;

const PickerSwitchButton = styled(Button)`
  margin: 8px auto 0;
`;
const SubmitButton = styled(Button)`
  margin: 16px auto 0;
`;
const TimezoneStyled = styled.div`
  margin-top: 8px;
  font-size: 12px;
`;

const SlotPickerSelect = styled(Select)`
  margin-top: 16px;
`;

class DateTimeSlotPicker extends React.Component {
  getState() {
    const { timezone, initialDateTime } = this.props;
    const todayDate = new Date().setSeconds(0); // Seconds must be 0 for precise scheduling
    const isTimezoneSet = !!timezone;

    // Determine initial date and time for the picker
    const today = isTimezoneSet
      ? moment.tz(todayDate, timezone)
      : moment(todayDate);
    const selectedDateTime = initialDateTime || today.clone().add(3, 'hours');
    const shouldDisplaySlotPicker = this.shouldDisplaySlotPickerOnInit(
      selectedDateTime,
      this.props
    );

    return {
      today,
      selectedDateTime,
      shouldDisplaySlotPicker,
      emptyByDefault: false,
    };
  }

  shouldDisplaySlotPickerOnInit = (selectedDateTime, props) => {
    const { isSlotPickingAvailable, availableSchedulesSlotsForDay } = props;

    const hasAvailableSchedulesSlotsInfoForDay =
      typeof availableSchedulesSlotsForDay !== 'undefined';

    if (!isSlotPickingAvailable || !hasAvailableSchedulesSlotsInfoForDay)
      return undefined;

    const selectedTimestamp = selectedDateTime.unix();
    const isAnySlotSelected = availableSchedulesSlotsForDay.some(
      slot => slot.timestamp === selectedTimestamp
    );

    return isAnySlotSelected && props.isPinnedToSlot;
  };

  static propTypes = {
    shouldUse24hTime: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isSlotPickingAvailable: PropTypes.bool,
    doSelectedProfilesHaveSlots: PropTypes.bool,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    timezone: PropTypes.string,
    weekStartsMonday: PropTypes.bool.isRequired,
    availableSchedulesSlotsForDay: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.arrayOf(
        PropTypes.shape({
          isSlotFree: PropTypes.bool.isRequired,
          timestamp: PropTypes.number.isRequired,
        })
      ),
    ]),
    isPinnedToSlot: PropTypes.bool,
    metaData: PropTypes.object,
    initialDateTime: PropTypes.instanceOf(moment),
    submitButtonCopy: PropTypes.string,
  };

  static defaultProps = {
    shouldUse24hTime: false,
    isSlotPickingAvailable: false,
    doSelectedProfilesHaveSlots: false,
    onClick: () => {},
    onChange: () => {},
    timezone: 'Europe/Paris',
    submitButtonCopy: 'Schedule',
    availableSchedulesSlotsForDay: undefined,
    isPinnedToSlot: null,
    metaData: undefined,
  };

  state = this.getState();

  updateDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const newSelectedDateTime = this.state.selectedDateTime
      .year(year)
      .month(month)
      .date(day);
    const isPinnedToSlot = this.state.shouldDisplaySlotPicker;

    this.setState({
      selectedDateTime: newSelectedDateTime,
    });

    this.props.onChange(newSelectedDateTime, isPinnedToSlot);
  };

  updateTime = time => {
    const hours = time.hours();
    const minutes = time.minutes();
    const newSelectedDateTime = this.state.selectedDateTime
      .hour(hours)
      .minute(minutes);
    const isPinnedToSlot = this.state.shouldDisplaySlotPicker;

    this.setState({
      selectedDateTime: newSelectedDateTime,
    });

    this.props.onChange(newSelectedDateTime, isPinnedToSlot);
  };

  // Set to UTC, then negate the original offset
  stripOffsetFromMoment = m =>
    m
      .clone()
      .utc()
      .add(m.utcOffset(), 'm');

  onClick = this.props.onClick; // eslint-disable-line react/sort-comp

  onDayClick = day => {
    this.updateDate(day);
  };

  onTimePickerChange = this.updateTime;
  onSlotPickerChange = time => {
    this.updateTime(time);
    this.setState({ emptyByDefault: false });
  };

  onSwitchToSlotPickerClick = () => {
    // Update UI state
    this.setState({ shouldDisplaySlotPicker: true });

    // If a slot is available for the current date time, update store to
    // transition from custom time to pinned update mode
    const {
      isSlotPickingAvailable,
      availableSchedulesSlotsForDay,
    } = this.props;

    const hasAvailableSchedulesSlotsInfoForDay =
      typeof availableSchedulesSlotsForDay !== 'undefined';

    if (!isSlotPickingAvailable || !hasAvailableSchedulesSlotsInfoForDay)
      return;

    const selectedTimestamp = this.state.selectedDateTime.unix();
    const hasSlotAvailableForSelectedDateTime = availableSchedulesSlotsForDay.some(
      slot => slot.timestamp === selectedTimestamp
    );

    const isPinnedToSlot = hasSlotAvailableForSelectedDateTime;
    this.props.onChange(this.state.selectedDateTime, isPinnedToSlot);

    this.setState({ emptyByDefault: true });
  };

  onSwitchToTimePickerClick = () => {
    const isPinnedToSlot = false;

    this.setState({ shouldDisplaySlotPicker: isPinnedToSlot });
    this.props.onChange(this.state.selectedDateTime, isPinnedToSlot);
  };

  onSubmit = () => {
    if (!this.props.initialDateTime) {
      this.props.onChange(this.state.selectedDateTime, false);
    }
    this.props.onSubmit(this.state.selectedDateTime.unix());
  };

  componentWillReceiveProps(nextProps) {
    const { today, selectedDateTime, shouldDisplaySlotPicker } = this.state;

    // Update selectedDateTime with the new timezone if it changes
    if (
      this.props.timezone !== nextProps.timezone &&
      nextProps.timezone !== null
    ) {
      this.setState({
        today: today.tz(nextProps.timezone),
        selectedDateTime: selectedDateTime.tz(nextProps.timezone),
      });
    }

    /**
     * MC is only bootstrapped with limited slot info: if it gets initialized with
     * a scheduledAt date that falls outside of this bootstrapped slot coverage,
     * we'll try determining whether to start in "slot picker mode" or not once
     * we've got additional slot info at our disposal.
     */
    const willSlotPickingBeAvailable = nextProps.isSlotPickingAvailable;
    const hasAvailableSchedulesSlotsInfoForDay =
      typeof this.props.availableSchedulesSlotsForDay !== 'undefined';
    const willHaveAvailableSchedulesSlotsInfoForDay =
      typeof nextProps.availableSchedulesSlotsForDay !== 'undefined';
    const didInitSlotPickerDisplayState =
      typeof shouldDisplaySlotPicker !== 'undefined';

    const shouldInitSlotPickerDisplayInfo =
      willSlotPickingBeAvailable &&
      !hasAvailableSchedulesSlotsInfoForDay &&
      willHaveAvailableSchedulesSlotsInfoForDay &&
      !didInitSlotPickerDisplayState;

    if (shouldInitSlotPickerDisplayInfo) {
      this.setState({
        shouldDisplaySlotPicker: this.shouldDisplaySlotPickerOnInit(
          selectedDateTime,
          nextProps
        ),
      });
    }

    // Keep store and component state in sync
    if (this.props.isPinnedToSlot !== nextProps.isPinnedToSlot) {
      this.setState({
        shouldDisplaySlotPicker: nextProps.isPinnedToSlot,
      });
    }
  }

  render() {
    const {
      today,
      selectedDateTime,
      shouldDisplaySlotPicker,
      emptyByDefault,
    } = this.state;
    const {
      metaData,
      timezone,
      shouldUse24hTime,
      submitButtonCopy,
      isSlotPickingAvailable,
      availableSchedulesSlotsForDay,
      doSelectedProfilesHaveSlots,
    } = this.props;

    const hasAvailableSchedulesSlotsInfoForDay =
      typeof availableSchedulesSlotsForDay !== 'undefined';
    const shouldDisplayTimePicker = !shouldDisplaySlotPicker;

    const selectedDays = {
      selected: day => {
        const selectedDateTimeNoOffset = this.stripOffsetFromMoment(
          selectedDateTime
        );
        const dayNoOffset = this.stripOffsetFromMoment(moment(day));
        return selectedDateTimeNoOffset.isSame(dayNoOffset, 'day');
      },
    };

    const shouldDisplayTimezone = timezone !== null;
    const isTimeInFuture = selectedDateTime.isAfter();
    const formattedTimezone = shouldDisplayTimezone
      ? timezone.replace('/', ': ').replace('_', ' ')
      : null;
    const firstDayOfWeek = this.props.weekStartsMonday ? 1 : 0;

    return (
      <DateTimePicker onClick={this.onClick}>
        <InputDate
          initialMonth={new Date()}
          onDayClick={this.onDayClick}
          selectedDays={selectedDays.selected}
          firstDayOfWeek={firstDayOfWeek}
        />

        {shouldDisplayTimePicker && (
          <TimePicker
            shouldUse24hTime={shouldUse24hTime}
            time={selectedDateTime}
            timezone={timezone}
            onChange={this.onTimePickerChange}
          />
        )}

        {shouldDisplayTimePicker &&
          isSlotPickingAvailable &&
          doSelectedProfilesHaveSlots && (
            <PickerSwitchButton
              type="secondary"
              size="small"
              label="Switch to schedule slots"
              onClick={this.onSwitchToSlotPickerClick}
            />
          )}

        {shouldDisplaySlotPicker &&
          isSlotPickingAvailable &&
          (hasAvailableSchedulesSlotsInfoForDay ? (
            <SlotPicker
              metaData={metaData}
              shouldUse24hTime={shouldUse24hTime}
              timezone={timezone}
              slots={availableSchedulesSlotsForDay}
              slot={selectedDateTime}
              onChange={this.onSlotPickerChange}
              emptyByDefault={emptyByDefault}
            />
          ) : (
            <SlotPickerSelect disabled value="">
              <option value="">Loading slots…</option>
            </SlotPickerSelect>
          ))}

        {shouldDisplaySlotPicker && isSlotPickingAvailable && (
          <PickerSwitchButton
            type="secondary"
            size="small"
            label="Switch to custom time"
            onClick={this.onSwitchToTimePickerClick}
          />
        )}

        <SubmitButton
          type="primary"
          size="small"
          label={submitButtonCopy}
          onClick={this.onSubmit}
          disabled={!isTimeInFuture}
        />

        {shouldDisplayTimezone && (
          <TimezoneStyled>{formattedTimezone}</TimezoneStyled>
        )}
      </DateTimePicker>
    );
  }
}

export default DateTimeSlotPicker;
