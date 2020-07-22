import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { borderWidth, borderRadius } from '@bufferapp/components/style/border';
import { mystic } from '@bufferapp/components/style/color';
import { grayLighter } from '@bufferapp/ui/style/colors';
import ScheduleTableColumn from './ScheduleTableColumn';

const tableStyle = {
  display: 'flex',
  border: `${borderWidth} solid ${mystic}`,
  borderRadius,
  overflow: 'hidden',
};

const offStyles = css`
  background-color: ${grayLighter};
  border-left: ${borderWidth} solid ${mystic};
`;

const ColumnWrapper = styled.div`
  display: flex;
  margin-right: -1px;
  flex-grow: 1;
  ${props => props.displayOff && offStyles}
`;

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
      <ColumnWrapper key={dayName} displayOff={paused || times?.length === 0}>
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
      </ColumnWrapper>
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
