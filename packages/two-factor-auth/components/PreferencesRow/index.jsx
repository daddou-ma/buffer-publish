import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import { SensitiveData } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Text type="p">
        {t('preferences.security.tfaExplanation')}
        <Link
          newTab
          href="https://support.buffer.com/hc/en-us/articles/360038349434-Enabling-two-factor-authentication"
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
}
 
TwoFactorPreferencesRow.propTypes = {
  // machineState: PropTypes.string.isRequired,
  transition: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default TwoFactorPreferencesRow;
