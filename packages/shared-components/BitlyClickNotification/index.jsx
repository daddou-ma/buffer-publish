import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Notification from '../Notification/index';

const SpacedNotification = styled.div`
  margin-bottom: 0.75rem;
`;

const BitlyNotification = ({ marginAfter }) => {
  const notificationMessage = (
    <Notification
      type="info"
      title="Issue Reporting Clicks"
      body="We are aware of an issue with missing click counts from shortened-links. However, there's good news! We are currently working on a permanent solution and hope to have it available in the next couple of months."
    />
  );
  return marginAfter ? (
    <SpacedNotification>{notificationMessage}</SpacedNotification>
  ) : (
    notificationMessage
  );
};

BitlyNotification.propTypes = {
  marginAfter: PropTypes.bool.isRequired,
};

const BitlyClickNotification = ({
  hasBitlyFeature,
  isBitlyConnected,
  hasBitlyPosts,
  marginAfter = false,
}) => {
  return hasBitlyPosts && hasBitlyFeature && !isBitlyConnected ? (
    <BitlyNotification marginAfter={marginAfter} />
  ) : null;
};

BitlyClickNotification.propTypes = {
  hasBitlyFeature: PropTypes.bool.isRequired,
  isBitlyConnected: PropTypes.bool.isRequired,
  hasBitlyPosts: PropTypes.bool.isRequired,
  marginAfter: PropTypes.bool,
};

BitlyClickNotification.defaultProps = {
  marginAfter: false,
};

export default BitlyClickNotification;
