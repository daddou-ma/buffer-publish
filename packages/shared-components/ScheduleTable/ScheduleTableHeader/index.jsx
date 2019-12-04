import React from 'react';
import PropTypes from 'prop-types';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { Text, Button } from '@bufferapp/ui';

const headerStyle = {
  paddingTop: '1rem',
  paddingBottom: '1rem',
  borderBottom: `${borderWidth} solid ${mystic}`,
  cursor: 'default',
  outline: 'none',
  minHeight: '40px',
};

const dayMap = {
  Monday: 'mon',
  Tuesday: 'tue',
  Wednesday: 'wed',
  Thursday: 'thu',
  Friday: 'fri',
  Saturday: 'sat',
  Sunday: 'sun',
};

const buttonStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const ScheduleTableHeader = ({
  dayName,
  paused,
  onPauseToggleClick,
  disabled,
}) => (
  <div style={headerStyle} tabIndex="0">
    <Text type="label">{dayName}</Text>
    {!disabled && (
      <div style={buttonStyle}>
        <Button
          type="link"
          size="small"
          label={`Turn ${paused ? 'on' : 'off'}`}
          onClick={() => onPauseToggleClick(dayMap[dayName], paused)}
        />
      </div>
    )}
  </div>
);

ScheduleTableHeader.propTypes = {
  dayName: PropTypes.string.isRequired,
  paused: PropTypes.bool.isRequired,
  onPauseToggleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default ScheduleTableHeader;
