import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import QueueButtonGroup from '../QueueButtonGroup';

const Wrapper = styled.div`
  margin-left: auto;
`;

const CalendarButtons = ({ onCalendarClick }) => {
  const calendarBtns = ['Day', 'Week', 'Month'];

  return (
    <Wrapper>
      <QueueButtonGroup
        buttons={calendarBtns}
        onClick={type => onCalendarClick(type)}
      />
    </Wrapper>
  );
};

CalendarButtons.propTypes = {
  onCalendarClick: PropTypes.func.isRequired,
};

export default CalendarButtons;
