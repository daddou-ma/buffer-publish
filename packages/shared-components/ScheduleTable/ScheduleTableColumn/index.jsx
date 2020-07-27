import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import { borderWidth } from '@bufferapp/components/style/border';
import { mystic, geyser } from '@bufferapp/components/style/color';
import ScheduleTableHeader from '../ScheduleTableHeader';
import ScheduleTableCell from '../ScheduleTableCell';

const columnHeight = '8rem';

const ColumnStyles = styled.div`
  width: 0;
  min-height: ${columnHeight};
  text-align: center;
  border-right: ${borderWidth} solid ${mystic};
  flex-grow: 1;
  color: hasTimes ? initial : ${geyser};
`;

const columnWrapperStyle = {
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
};

const ScheduleTableColumn = ({
  dayName,
  disabled,
  paused,
  select24Hours,
  times,
  onRemoveTimeClick,
  onUpdateTime,
  onPauseToggleClick,
}) => {
  const hasTimes = times?.length > 0;
  return (
    <ColumnStyles hasTimes={hasTimes}>
      <ScheduleTableHeader
        disabled={disabled}
        dayName={dayName}
        displayOn={!paused && hasTimes}
        onPauseToggleClick={onPauseToggleClick}
      />
      <div style={columnWrapperStyle}>
        {times.map((time, index) => (
          <ScheduleTableCell
            disabled={disabled}
            key={uuid()}
            select24Hours={select24Hours}
            time={time}
            onRemoveTimeClick={onRemoveTimeClick}
            onUpdateTime={onUpdateTime}
            dayName={dayName}
            timeIndex={index}
            paused={paused}
          />
        ))}
      </div>
    </ColumnStyles>
  );
}

ScheduleTableColumn.defaultProps = {
  disabled: false,
  select24Hours: false,
};

ScheduleTableColumn.propTypes = {
  dayName: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  paused: PropTypes.bool.isRequired,
  select24Hours: PropTypes.bool,
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
  onRemoveTimeClick: PropTypes.func.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  onPauseToggleClick: PropTypes.func.isRequired,
};

export default ScheduleTableColumn;
