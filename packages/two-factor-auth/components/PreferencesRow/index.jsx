import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import { SensitiveData } from '@bufferapp/publish-shared-components';

const formattedMethod = {
  '': 'Disabled',
  sms: 'SMS',
  app: 'Authenticator App',
};

const TwoFactorPreferencesRow = ({
  // machineState,
  transition,
  method,
  phoneNumber,
}) => (
  <Fragment>
    <Text type="p">
      Two factor authentication adds an extra layer of security for your Buffer
      account. Whenever you log in to your account, after entering your username
      and password, you will be asked for a second authentication code that was
      sent to your mobile phone via text or a free mobile app.{' '}
      <Link
        newTab
        href="https://faq.buffer.com/article/443-what-is-2-step-login"
      >
        Learn more
      </Link>
    </Text>
    {method && (
      <Fragment>
        <div style={{ margin: '16px 0 0 0' }}>
          <Text type="p">
            Method: <b>{formattedMethod[method]}</b>{' '}
            <Link href="#" onClick={() => transition('CHANGE_METHOD')}>
              Edit
            </Link>
          </Text>
        </div>
        {method === 'sms' && (
          <div style={{ margin: '8px 0 0 0' }}>
            <Text type="p">
              Phone number:{' '}
              <SensitiveData>
                <b>{phoneNumber}</b>
              </SensitiveData>{' '}
              <Link href="#" onClick={() => transition('CHANGE_SMS')}>
                Edit
              </Link>
            </Text>
          </div>
        )}
        <div style={{ margin: '8px 0 0 0' }}>
          <Text type="p">
            Recovery code:{' '}
            <Link href="#" onClick={() => transition('SHOW_RECOVERY')}>
              View
            </Link>
          </Text>
        </div>
      </Fragment>
    )}
  </Fragment>
);

TwoFactorPreferencesRow.propTypes = {
  // machineState: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default TwoFactorPreferencesRow;
