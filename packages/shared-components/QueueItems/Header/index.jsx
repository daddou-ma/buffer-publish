import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QueueHeader from '../../QueueHeader';
import CalendarButtons from '../../CalendarButtons';

const HeaderWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
`;

const Header = ({
  item,
  index,
  onCalendarClick,
  shouldRenderCalendarButtons,
}) => {
  const { text, dayOfWeek, date, id } = item;
  const isFirstItem = index === 0;
  const renderCalendarButtons = shouldRenderCalendarButtons && isFirstItem;

  return (
    <HeaderWrapper key={id}>
      <QueueHeader id={id} text={text} dayOfWeek={dayOfWeek} date={date} />
      {renderCalendarButtons && (
        <CalendarButtons onCalendarClick={onCalendarClick} />
      )}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string,
    queueItemType: PropTypes.string,
    dayOfWeek: PropTypes.string,
  }).isRequired,
  onCalendarClick: PropTypes.func,
  shouldRenderCalendarButtons: PropTypes.bool,
};

Header.defaultProps = {
  onCalendarClick: () => {},
  shouldRenderCalendarButtons: false,
};

export default Header;
