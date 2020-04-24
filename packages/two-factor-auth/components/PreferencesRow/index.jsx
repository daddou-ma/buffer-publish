import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Link } from '@bufferapp/components';
import { Text } from '@bufferapp/ui';
import { SensitiveData } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

const formattedMethod = t => ({
  '': t('common.disabled'),
  sms: t('preferences.security.sms'),
  app: t('preferences.security.authenticatorApp'),
});

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
          {t('common.learnMore')}
        </Link>
      </Text>
      {method && (
        <Fragment>
          <div style={{ margin: '16px 0 0 0' }}>
            <Text type="p">
              {t('preferences.security.method')}:{' '}
              <b>{formattedMethod(t)[method]}</b>{' '}
              <Link href="#" onClick={() => transition('CHANGE_METHOD')}>
                {t('common.edit')}
              </Link>
            </Text>
          </div>
          {method === 'sms' && (
            <div style={{ margin: '8px 0 0 0' }}>
              <Text type="p">
                {t('common.phoneNumber')}:{' '}
                <SensitiveData>
                  <b>{phoneNumber}</b>
                </SensitiveData>{' '}
                <Link href="#" onClick={() => transition('CHANGE_SMS')}>
                  {t('common.edit')}
                </Link>
              </Text>
            </div>
          )}
          <div style={{ margin: '8px 0 0 0' }}>
            <Text type="p">
              {t('preferences.security.recoveryCode')}:{' '}
              <Link href="#" onClick={() => transition('SHOW_RECOVERY')}>
                {t('common.view')}
              </Link>
            </Text>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

TwoFactorPreferencesRow.propTypes = {
  transition: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default TwoFactorPreferencesRow;
