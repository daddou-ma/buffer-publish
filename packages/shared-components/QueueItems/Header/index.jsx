import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import QueueHeader from '../../QueueHeader';
import CalendarButtons from '../../CalendarButtons';

const HeaderWrapper = styled.div`
  margin-top: ${props =>
    props.isFirstItem && !props.renderCalendarButtons ? '0.5rem' : '1rem'};
  margin-bottom: ${props => (props.renderCalendarButtons ? '0.5rem' : '')};
  display: flex;
  align-items: center;
`;

const Header = ({
  item,
  isFirstItem,
  onCalendarClick,
  shouldRenderCalendarButtons,
}) => {
  const { text, dayOfWeek, date, id } = item;
  const renderCalendarButtons = shouldRenderCalendarButtons && isFirstItem;

  return (
    <HeaderWrapper
      key={id}
      renderCalendarButtons={renderCalendarButtons}
      isFirstItem={isFirstItem}
    >
      <QueueHeader id={id} text={text} dayOfWeek={dayOfWeek} date={date} />
      {renderCalendarButtons && (
        <CalendarButtons onCalendarClick={onCalendarClick} />
      )}
    </HeaderWrapper>
  );
};

Header.propTypes = {
  isFirstItem: PropTypes.bool.isRequired,
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
