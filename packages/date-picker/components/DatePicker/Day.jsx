import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled, { css } from 'styled-components';

import {
  Button,
  Text,
} from '@bufferapp/components';

import {
  curiousBlue,
  geyser,
  white,
} from '@bufferapp/components/style/color';

const Container = styled.div`
  display: inline-flex;
  width: 1.7rem;
  height: 1rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  ${props => props.inactive && css`
    opacity: 0.5;
    &:hover {
      cursor: disabled;
    }
  `}
`;

const Marker = styled.span`
  display: inline-block;
  width: 1.7rem;
  height: 1.7rem;
  line-height: 1.7rem;
  border-radius: 1.7rem;

  ${props => props.today && css`
    background: ${geyser};
  `}

  ${props => props.selected && css`
    background: ${curiousBlue};
    color: ${white};
  `}

  ${props => props.start && css`
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `}

  ${props => props.end && css`
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `}
`;

const StartMarkerConnector = styled.span`
  height: 1.5rem;
  flex-grow: 1;

  ${props => props.active && css`
    background: ${curiousBlue};
  `}

  ${props => props.round && css`
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  `}
`;

const EndMarkerConnector = styled.span`
  height: 1.5rem;
  flex-grow: 1;

  ${props => props.active && css`
    background: ${curiousBlue};
  `}

  ${props => props.round && css`
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  `}
`;

const Day = (props) => {
  const {
    timestamp,
    day,
    inMonth,
    today,
    selectedBetween,
    selectedStart,
    selectedEnd,
    isDisabled,
    startDate,
    endDate,
    disabledText,
    handleClick,
  } = props;

  const m = moment.unix(timestamp);
  const isEndOfWeek = m.day() === 0;
  const isStartOfWeek = m.day() === 1;

  const isSelected = selectedStart || selectedEnd || selectedBetween;

  const showStartConnector = (selectedStart || selectedBetween) &&
                            (endDate !== null && startDate !== null) &&
                            (startDate !== endDate);

  const showEndConnector = (selectedEnd || selectedBetween) &&
                            (startDate !== null) &&
                            (endDate !== startDate);

  const showRoundEndConnector = isEndOfWeek && selectedBetween;
  const showRoundStartConnector = isStartOfWeek && selectedBetween;

  const markerTextColor = (isSelected || showStartConnector || showEndConnector) ? 'white' : null;

  return (
    <Container
      inactive={!inMonth || isDisabled}
      data-tip={disabledText}
    >
      <StartMarkerConnector
        active={showEndConnector || showRoundStartConnector}
        round={showRoundStartConnector}
      />
      <Button
        noStyle
        onClick={() => (isDisabled ? null : handleClick(timestamp))}
      >
        <Marker
          hover={isDisabled}
          today={today}
          selected={isSelected}
          start={showStartConnector}
          end={showEndConnector}
        >
          <Text size="extra-small" color={markerTextColor}>{day}</Text>
        </Marker>
      </Button>
      <EndMarkerConnector
        active={showStartConnector || showRoundEndConnector}
        round={showRoundEndConnector}
      />
    </Container>
  );
};

Day.defaultProps = {
  startDate: null,
  endDate: null,
};

Day.propTypes = {
  day: PropTypes.number.isRequired,
  today: PropTypes.bool.isRequired,
  inMonth: PropTypes.bool.isRequired,
  selectedBetween: PropTypes.bool.isRequired,
  selectedEnd: PropTypes.bool.isRequired,
  selectedStart: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  disabledText: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  startDate: PropTypes.number,
  endDate: PropTypes.number,
  timestamp: PropTypes.number.isRequired,
};

export default Day;
