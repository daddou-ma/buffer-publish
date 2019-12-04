import React from 'react';
import PropTypes from 'prop-types';
import { InputTime } from '@bufferapp/components';
import CrossIcon from '@bufferapp/ui/Icon/Icons/Cross';
import { Button } from '@bufferapp/ui';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import TableCell from '../../TableCell';

const style = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

/* eslint-disable react/prop-types */

const RemoveButton = ({ time, onRemoveTimeClick, buttonStyle }) => (
  <div style={buttonStyle}>
    <Button
      type="text"
      hasIconOnly
      label="remove time"
      icon={<CrossIcon />}
      onClick={() => onRemoveTimeClick(time)}
    />
  </div>
);

const TableCellContents = ({
  disabled,
  hovered,
  select24Hours,
  time,
  onRemoveTimeClick,
}) => {
  const buttonStyle = calculateStyles(
    {
      default: {
        opacity: 0,
        position: 'absolute',
        right: '-4px',
        top: '-2px',
      },
      hovered: {
        opacity: '1',
      },
      disabled: {
        opacity: '0',
      },
    },
    {
      hovered,
      disabled,
    }
  );
  return (
    <div style={style}>
      <div
        style={{
          width: '4.5rem',
          display: 'flex',
          height: '2rem',
          alignItems: 'center',
        }}
      >
        <InputTime
          disabled={disabled}
          input={time}
          select24Hours={select24Hours}
          minimal
          centerText
          displayTimeColon
          fontSize={'small'}
        />
      </div>
      {!disabled && (
        <RemoveButton
          time={time}
          onRemoveTimeClick={onRemoveTimeClick}
          buttonStyle={buttonStyle}
          disabled={disabled}
        />
      )}
    </div>
  );
};
/* eslint-enable react/prop-types */
const dayMap = {
  Monday: 'mon',
  Tuesday: 'tue',
  Wednesday: 'wed',
  Thursday: 'thu',
  Friday: 'fri',
  Saturday: 'sat',
  Sunday: 'sun',
};

const ScheduleTableCell = ({
  disabled,
  select24Hours,
  time,
  onRemoveTimeClick,
  onUpdateTime,
  dayName,
  timeIndex,
  paused,
}) => (
  <TableCell>
    <TableCellContents
      disabled={disabled}
      select24Hours={select24Hours}
      onRemoveTimeClick={() =>
        onRemoveTimeClick(
          time.hours,
          time.minutes,
          dayMap[dayName],
          timeIndex,
          paused
        )
      } //eslint-disable-line
      time={{
        ...time,
        onChange: ({ hours, minutes }) => {
          hours = hours < 10 ? `0${hours}` : hours;
          minutes = minutes < 10 ? `0${minutes}` : minutes;
          onUpdateTime(hours, minutes, dayMap[dayName], timeIndex, paused);
        },
      }}
    />
  </TableCell>
);

ScheduleTableCell.defaultProps = {
  disabled: false,
  select24Hours: false,
};

ScheduleTableCell.propTypes = {
  disabled: PropTypes.bool.isRequired,
  select24Hours: PropTypes.bool.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  dayName: PropTypes.string.isRequired,
  timeIndex: PropTypes.number.isRequired,
  time: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
      }),
      PropTypes.string,
    ]),
    onChange: PropTypes.func,
  }).isRequired,
  onRemoveTimeClick: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
};

export default ScheduleTableCell;
