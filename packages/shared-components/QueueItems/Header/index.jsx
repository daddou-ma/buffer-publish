import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { Gear } from '@bufferapp/ui/Icon';
import QueueHeader from '../../QueueHeader';
import CalendarButtons from '../../CalendarButtons';

const HeaderWrapper = styled.div`
  margin-top: ${props =>
    props.isFirstItem && !props.renderCalendarButtons ? '0.5rem' : '1rem'};
  margin-bottom: ${props => (props.renderCalendarButtons ? '0.5rem' : '')};
  display: flex;
  align-items: center;
`;

const TimezoneWrapper = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
`;

const Header = ({
  item,
  isFirstItem,
  onCalendarClick,
  shouldRenderCalendarButtons,
  timezoneItems,
}) => {
  const {
    profileTimezone,
    shouldDisplayTimezone,
    onTimezoneClick,
  } = timezoneItems;
  const { text, dayOfWeek, date, id } = item;
  const renderCalendarButtons = shouldRenderCalendarButtons && isFirstItem;

  return (
    <HeaderWrapper
      key={id}
      renderCalendarButtons={renderCalendarButtons}
      isFirstItem={isFirstItem}
    >
      <QueueHeader id={id} text={text} dayOfWeek={dayOfWeek} date={date} />
      {shouldDisplayTimezone && isFirstItem && (
        <TimezoneWrapper>
          <Text type="p" color="grayDark">
            {profileTimezone}
          </Text>
          <Button
            type="text"
            onClick={onTimezoneClick}
            icon={<Gear />}
            hasIconOnly
            label="Change Timezone"
            size="small"
          />

          {renderCalendarButtons && (
            <CalendarButtons onCalendarClick={onCalendarClick} />
          )}
        </TimezoneWrapper>
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
  timezoneItems: PropTypes.shape({
    profileTimezone: PropTypes.string,
    shouldDisplayTimezone: PropTypes.bool,
    onTimezoneClick: PropTypes.func,
  }),
  onCalendarClick: PropTypes.func,
  shouldRenderCalendarButtons: PropTypes.bool,
};

Header.defaultProps = {
  onCalendarClick: () => {},
  shouldRenderCalendarButtons: false,
  timezoneItems: {},
};

export default Header;
