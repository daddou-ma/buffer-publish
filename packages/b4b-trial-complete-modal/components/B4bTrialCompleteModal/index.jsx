import React from 'react';
import PropTypes from 'prop-types';

import { Popover, Divider } from '@bufferapp/components';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { Button } from '@bufferapp/ui';

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
  padding: '16px 24px',
  display: 'flex',
  justifyContent: 'flex-end',
};

const completeAndUpgrade = () => {
  window.location.assign(`${getURL.getBillingURL({
    cta: SEGMENT_NAMES.EXPIRED_TRIAL_BUSINESS_UPGRADE,
  })}`);
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
        <Divider marginBottom={0}/>
        <div style={modalActionsStyle}>
          <Button
            type="text"
            label={translations.cancelTrial}
            onClick={cancelTrial}
          />
          <Button
            type="primary"
            label={translations.completeAndUpgrade}
            onClick={() => completeAndUpgrade()}
          />
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
