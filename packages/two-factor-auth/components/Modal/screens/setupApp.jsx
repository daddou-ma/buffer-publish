import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@bufferapp/components';
import { Text, Button } from '@bufferapp/ui';
import QrCode from './_qr-code';

const SetupApp = ({ transition, qrCode }) => (
  <Fragment>
    <Text type="h3">Set up your authenticator app</Text>
    <div>
      <Text type="p">
        Scan the QR code below in your authenticator app and you&apos;re all
        set!{' '}
      </Text>
      <Text type="p">
        (If you have not installed an authenticator app yet,{' '}
        <Link
          newTab
          href="https://support.buffer.com/hc/en-us/articles/360038349434-Enabling-two-factor-authentication"
        >
          read here for more information.
        </Link>
        )
      </Text>
    </div>
    <div style={{ textAlign: 'center' }}>
      <QrCode data={qrCode} />
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Button type="text" label="Back" onClick={() => transition('BACK')} />
      <Button type="primary" label="Next" onClick={() => transition('NEXT')} />
    </div>
  </Fragment>
);

SetupApp.propTypes = {
  transition: PropTypes.func.isRequired,
  qrCode: PropTypes.string.isRequired,
};

export default SetupApp;
