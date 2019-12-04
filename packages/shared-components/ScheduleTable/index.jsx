import React from 'react';
import PropTypes from 'prop-types';
import { borderWidth, borderRadius } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import ScheduleTableColumn from './ScheduleTableColumn';

const tableStyle = {
  display: 'flex',
  border: `${borderWidth} solid ${mystic}`,
  borderRadius,
  overflow: 'hidden',
};

const tableColumnWrapperStyle = {
  display: 'flex',
  marginRight: '-1px',
  flexGrow: '1',
};

const pausedColumnStyle = {
  display: 'flex',
  marginRight: '-1px',
  flexGrow: '1',
  backgroundColor: '#f8f8f8',
  borderLeft: `${borderWidth} solid ${mystic}`,
};

const ScheduleTable = ({
  days,
  disabled,
  select24Hours,
  onRemoveTimeClick,
  onUpdateTime,
  onPauseToggleClick,
}) => (
  <div style={tableStyle}>
    {days.map(({ dayName, postingTimesTotal, times, paused }) => (
      <div
        key={dayName}
        style={paused ? pausedColumnStyle : tableColumnWrapperStyle}
      >
        <ScheduleTableColumn
          dayName={dayName}
          paused={paused}
          disabled={disabled}
          postingTimesTotal={postingTimesTotal}
          select24Hours={select24Hours}
          times={times}
          onRemoveTimeClick={onRemoveTimeClick}
          onUpdateTime={onUpdateTime}
          onPauseToggleClick={onPauseToggleClick}
        />
      </div>
    ))}
  </div>
);

// TODO: onChange and onRemoveTimeClick required when app is not read-only
ScheduleTable.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      dayName: PropTypes.string,
      postingTimesTotal: PropTypes.number,
      times: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.oneOfType([
            PropTypes.shape({
              hours: PropTypes.number.isRequired,
              minutes: PropTypes.number.isRequired,
            }),
            PropTypes.string,
          ]),
        }).isRequired
      ).isRequired,
    })
  ).isRequired,
  disabled: PropTypes.bool.isRequired,
  select24Hours: PropTypes.bool.isRequired,
  onRemoveTimeClick: PropTypes.func.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  onPauseToggleClick: PropTypes.func.isRequired,
};

ScheduleTable.defaultProps = {
  disabled: false,
  select24Hours: false,
};

export default ScheduleTable;
