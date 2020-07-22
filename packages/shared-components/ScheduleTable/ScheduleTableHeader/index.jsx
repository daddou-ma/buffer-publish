import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { Text, Switch } from '@bufferapp/ui';

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

const SwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const ScheduleTableHeader = ({
  dayName,
  paused,
  onPauseToggleClick,
  disabled,
  displayOn,
}) => {
  // We are displaying off in switch if user has no times scheduled
  const [isOn, setIsOn] = useState(displayOn);
  return (
    <div style={headerStyle}>
      <Text type="label">{dayName}</Text>
      {!disabled && (
        <SwitchWrapper>
          <Switch
            isOn={isOn}
            handleSwitch={() => {
              setIsOn(!isOn);
              onPauseToggleClick(dayMap[dayName], paused);
            }}
            label={isOn ? 'On' : 'Off'}
            id="posting-schedule"
          />
        </SwitchWrapper>
      )}
    </div>
  );
};

ScheduleTableHeader.propTypes = {
  dayName: PropTypes.string.isRequired,
  paused: PropTypes.bool.isRequired,
  onPauseToggleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  displayOn: PropTypes.bool.isRequired,
};

export default ScheduleTableHeader;
