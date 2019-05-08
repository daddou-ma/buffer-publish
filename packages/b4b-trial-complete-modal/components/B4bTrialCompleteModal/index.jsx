import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import { BDSButton } from '@bufferapp/publish-shared-components';
import { trackAction } from '@bufferapp/publish-data-tracking';

const modalStyle = {
  borderRadius: '4px',
  width: '562px',
  background: '#fff url(https://s3.amazonaws.com/buffer-publish/images/b4b-welcome-modal-background.svg) no-repeat top center',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.16)',
  display: 'flex',
  flexDirection: 'column',
};

const modalContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '115px 24px 32px 24px',
};

const headerStyle = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  lineHeight: '24px',
  fontSize: '24px',
  color: '#3D3D3D',
  marginBottom: '8px',
};

const modalActionsStyle = {
  borderTop: '1px solid #E0E0E0',
  padding: '16px 24px',
  textAlign: 'right',
};

const completeAndUpgrade = () => {
  // Redirect users to Billing page so they can complete their upgrade
  if (window.location.hostname === 'publish.local.buffer.com') {
    window.location.assign('https://local.buffer.com/app/account/receipts?content_only=true');
  } else {
    window.location.assign('https://buffer.com/app/account/receipts?content_only=true');
  }
};

const B4bTrialCompleteModal = ({
  translations,
  cancelTrial,
}) => (
  <div style={{ position: 'fixed', zIndex: '3000' }}>
    <Popover>
      <div style={modalStyle}>
        <div style={modalContentStyle}>
          <div style={headerStyle}>{translations.header}</div>
        </div>
        <div style={modalActionsStyle}>
          <BDSButton onClick={cancelTrial} type="small textOnly">{translations.cancelTrial}</BDSButton>
          <BDSButton onClick={() => completeAndUpgrade()} type="small">{translations.completeAndUpgrade}</BDSButton>
        </div>
      </div>
    </Popover>
  </div>
);

B4bTrialCompleteModal.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  cancelTrial: PropTypes.func.isRequired,
};

export default B4bTrialCompleteModal;
