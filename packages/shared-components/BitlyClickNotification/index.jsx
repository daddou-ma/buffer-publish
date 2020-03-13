import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Notification } from '../index';

const SpacedNotification = styled.div`
  margin-bottom: 0.75rem;
`;

const BitlyNotification = ({ marginAfter, onConnectBitlyURLClick }) => {
  const notificationMessage = (
    <Notification
      type="info"
      title="Known Issue With Reported Clicks"
      body="We’re aware of an issue regarding reported clicks from shortened links and are actively working to resolve the situation. In the meantime, connecting your own bit.ly account will fix your reporting. Our sincere apologies for this inconvenience!"
      button={{
        type: 'primary',
        action: onConnectBitlyURLClick,
        text: 'Connect Your Bit.ly Account',
      }}
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
  onConnectBitlyURLClick: PropTypes.func.isRequired,
};

const BitlyClickNotification = ({
  isFreeUser,
  isBitlyConnected,
  hasBitlyPosts,
  marginAfter = false,
  onConnectBitlyURLClick,
}) => {
  return hasBitlyPosts && !isFreeUser() && !isBitlyConnected ? (
    <BitlyNotification marginAfter={marginAfter} onConnectBitlyURLClick={onConnectBitlyURLClick}/>
  ) : null;
};

BitlyClickNotification.propTypes = {
  isFreeUser: PropTypes.func.isRequired,
  isBitlyConnected: PropTypes.bool.isRequired,
  hasBitlyPosts: PropTypes.bool.isRequired,
  marginAfter: PropTypes.bool,
  onConnectBitlyURLClick: PropTypes.func.isRequired,
};

BitlyClickNotification.defaultProps = {
  marginAfter: false,
};

export default BitlyClickNotification;
