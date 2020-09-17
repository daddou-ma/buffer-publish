import { Button } from '@bufferapp/ui';
import PropTypes from 'prop-types';
import React from 'react';

const connectBitlyButton = {
  marginTop: '0.5rem',
  width: '100%',
};

const ConnectBitlyToggler = ({
  hasBitlyFeature,
  showConnectBitly,
  isBitlyConnected,
  onDisconnectBitlyURLClick,
  onConnectBitlyURLClick,
}) => {
  if (showConnectBitly) {
    if (hasBitlyFeature) {
      if (isBitlyConnected) {
        return (
          <div style={connectBitlyButton}>
            <Button
              fullWidth
              type="primary"
              label="Disconnect Bit.ly"
              onClick={onDisconnectBitlyURLClick}
            />
          </div>
        );
      }
      return (
        <div style={connectBitlyButton}>
          <Button
            fullWidth
            type="primary"
            label="Connect Bit.ly"
            onClick={onConnectBitlyURLClick}
          />
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
  hasBitlyFeature: PropTypes.bool.isRequired,
};
export default ConnectBitlyToggler;
