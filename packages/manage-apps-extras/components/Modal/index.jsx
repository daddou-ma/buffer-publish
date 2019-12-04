import React from 'react';
import PropTypes from 'prop-types';
import { Popover, Card } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';

const Modal = ({
  onConfirmClick,
  onCancelClick,
  submitting,
  appId,
  appName,
}) => (
  <Popover onOverlayClick={() => onCancelClick()}>
    <div style={{ width: '30rem' }}>
      <Card reducedPadding>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Text type="h3">Are you sure?</Text>
          <Text type="p">
            You are about to revoke access to <b>{appName}</b>. This will
            prevent the app from working with your Buffer account. Are you sure
            you want to continue?
          </Text>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: '1rem',
            }}
          >
            <Button
              type="text"
              disabled={submitting}
              onClick={onCancelClick}
              label="Cancel"
            />
            <div style={{ margin: '0.5rem' }} />
            <Button
              type="primary"
              onClick={() => onConfirmClick({ appId })}
              disabled={submitting}
              label="Yes, Revoke Access"
            />
          </div>
        </div>
      </Card>
    </div>
  </Popover>
);

Modal.propTypes = {
  onConfirmClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  appId: PropTypes.string.isRequired,
  appName: PropTypes.string.isRequired,
};

Modal.defaultProps = {
  submitting: false,
};

export default Modal;
