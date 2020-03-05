import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text } from '@bufferapp/ui';

const QueueHeaderWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin: 1rem 0;
`;

const QueueHeaderDayOfWeek = styled(Text)`
  margin: 0;
  line-height: 18px;
`;

const QueueHeaderDate = styled(Text)`
  text-transform: uppercase;
  margin: 0 0 0 8px;
  line-height: 14px;
`;

const QueueHeader = ({ text, id, dayOfWeek, date }) => {
  const dateFormat = dayOfWeek && date;
  if (!text && !dateFormat) return null;
  return (
    <QueueHeaderWrapper key={id}>
      {dateFormat ? (
        <React.Fragment>
          <QueueHeaderDayOfWeek type="h3">{dayOfWeek}</QueueHeaderDayOfWeek>
          <QueueHeaderDate type="p" color="grayDark">
            {date}
          </QueueHeaderDate>
        </React.Fragment>
      ) : (
        <QueueHeaderDayOfWeek type="h3">{text}</QueueHeaderDayOfWeek>
      )}
    </QueueHeaderWrapper>
  );
};

QueueHeader.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string.isRequired,
  dayOfWeek: PropTypes.string,
  date: PropTypes.string,
};

QueueHeader.defaultProps = {
  text: undefined,
  dayOfWeek: undefined,
  date: undefined,
};

export default QueueHeader;
