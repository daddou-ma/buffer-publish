import React from 'react';
import PropTypes from 'prop-types';

import { Toggle } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';

import Modal from '../Modal';
import PreferencesRow from '../PreferencesRow';

const rowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const TwoFactorAuth = ({
  machineState,
  isEnabled,
  method,
  phoneNumber,
  updatePhoneNumber,
  editMode,
  recoveryCode,
  transition,
  setPhoneNumber,
  submitPhoneNumber,
  loading,
  error,
  setupApp,
  qrCode,
  updateMethod,
  submitCode,
  handleRecoveryCodeSelect,
}) => (
  <div style={rowStyle}>
    <div
      style={{
        marginRight: '1rem',
      }}
    >
      <Text type="h3">Two Factor Authentication</Text>
      <div
        style={{
          marginTop: '0.5rem',
          maxWidth: '700px',
        }}
      >
        <PreferencesRow
          machineState={machineState}
          transition={transition}
          method={method}
          phoneNumber={phoneNumber}
        />
        <Modal
          machineState={machineState}
          transition={transition}
          updatePhoneNumber={updatePhoneNumber}
          setPhoneNumber={setPhoneNumber}
          submitPhoneNumber={submitPhoneNumber}
          loading={loading}
          error={error}
          setupApp={setupApp}
          qrCode={qrCode}
          updateMethod={updateMethod}
          submitCode={submitCode}
          handleRecoveryCodeSelect={handleRecoveryCodeSelect}
          editMode={editMode}
          recoveryCode={recoveryCode}
        />
      </div>
    </div>
    <div
      style={{
        paddingRight: '0.5rem',
      }}
    >
      <Toggle
        on={isEnabled}
        onClick={() => transition(isEnabled ? 'DISABLE' : 'ENABLE')}
        disabled={!['enabled', 'disabled'].includes(machineState)}
        size={'mini'}
      />
    </div>
  </div>
);

TwoFactorAuth.propTypes = {
  machineState: PropTypes.string.isRequired,
  isEnabled: PropTypes.bool.isRequired,
  method: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  updatePhoneNumber: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  recoveryCode: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  submitPhoneNumber: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  setupApp: PropTypes.func.isRequired,
  qrCode: PropTypes.string.isRequired,
  updateMethod: PropTypes.string.isRequired,
  submitCode: PropTypes.func.isRequired,
  handleRecoveryCodeSelect: PropTypes.func.isRequired,
};

export default TwoFactorAuth;
