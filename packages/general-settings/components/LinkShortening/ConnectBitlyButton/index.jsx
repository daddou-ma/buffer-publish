import { Button } from '@bufferapp/components';
import PropTypes from 'prop-types';
import React from 'react';

const connectBitlyButton = {
  marginTop: '0.5rem',
  width: '100%',
};

const ConnectBitlyToggler = ({
  isFreeUser,
  showConnectBitly,
  isBitlyConnected,
  onDisconnectBitlyURLClick,
  onConnectBitlyURLClick,
}) => {
  if (showConnectBitly) {
    if (!isFreeUser()) {
      if (isBitlyConnected) {
        return (
          <div style={connectBitlyButton}>
            <Button
              fillContainer
              onClick={onDisconnectBitlyURLClick}
            >
              Disconnect Bit.ly
            </Button>
          </div>
        );
      }
      return (
        <div style={connectBitlyButton}>
          <Button
            fillContainer
            onClick={onConnectBitlyURLClick}
          >
            Connect Bit.ly
          </Button>
        </div>
      );
    }
  }
  return null;
};

ConnectBitlyToggler.propTypes = {
  isBitlyConnected: PropTypes.bool.isRequired,
  showConnectBitly: PropTypes.bool.isRequired,
  onDisconnectBitlyURLClick: PropTypes.func.isRequired,
  onConnectBitlyURLClick: PropTypes.func.isRequired,
  isFreeUser: PropTypes.func.isRequired,
};
export default ConnectBitlyToggler;
