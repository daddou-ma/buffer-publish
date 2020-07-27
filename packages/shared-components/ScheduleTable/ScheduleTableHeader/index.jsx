import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { Text, Switch } from '@bufferapp/ui';

const Header = styled.div`
  padding-top: 1rem;
  border-bottom: ${borderWidth} solid ${mystic};
  cursor: default;
  outline: none;
  min-height: 40px;
  ${props =>
    !props.disabled &&
    css`
      padding-bottom: 1rem;
    `}
`;

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
  onPauseToggleClick,
  disabled,
  displayOn,
}) => {
  // We are displaying off in switch if user has no times scheduled
  const [isOn, setIsOn] = useState(displayOn);
  return (
    <Header disabled={disabled}>
      <Text type="label">{dayName}</Text>
      {!disabled && (
        <SwitchWrapper>
          <Switch
            isOn={isOn}
            handleSwitch={() => {
              setIsOn(!isOn);
              onPauseToggleClick(dayMap[dayName], !isOn);
            }}
            label={isOn ? 'On' : 'Off'}
            id={`${dayName}-schedule`}
          />
        </SwitchWrapper>
      )}
    </Header>
  );
};

ScheduleTableHeader.propTypes = {
  dayName: PropTypes.string.isRequired,
  onPauseToggleClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  displayOn: PropTypes.bool.isRequired,
};

export default ScheduleTableHeader;
