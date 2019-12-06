import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { AutoSelectText } from '@bufferapp/publish-shared-components';

const wrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const Recovery = ({
  transition,
  loading,
  editMode,
  recoveryCode,
  handleRecoveryCodeSelect,
}) => (
  <div style={wrapperStyle}>
    <Text type="h3">
      {editMode && 'Your Recovery Code'}
      {!editMode && 'Save this one-time recovery code'}
    </Text>
    <div>
      <Text type="p">
        With Two Factor Authentication, if you lose your phone there&apos;s a
        possibility you could get locked out of your account. Save this code in
        a safe place to use if you can&apos;t log in with your phone.
      </Text>
    </div>
    <AutoSelectText onSelect={handleRecoveryCodeSelect} copyToClipboard>
      {loading ? 'Please wait...' : recoveryCode}
    </AutoSelectText>

    <div style={{ alignSelf: 'flex-end', marginTop: '16px' }}>
      <Button type="primary" label="Done" onClick={() => transition('CLOSE')} />
    </div>
  </div>
);

Recovery.propTypes = {
  transition: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleRecoveryCodeSelect: PropTypes.func.isRequired,
  recoveryCode: PropTypes.string.isRequired,
};

export default Recovery;
