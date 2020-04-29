import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TwoFactorAuth from '@bufferapp/publish-two-factor-auth';
import { Divider } from '@bufferapp/components';
import { Row } from '@bufferapp/publish-shared-components';
import { Text, Button } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';

const ChangePassword = ({ t }) => (
  <Row>
    <div
      style={{
        marginRight: '1rem',
      }}
    >
      <Text type="h3">{t('preferences.security.password')}</Text>
      <div
        style={{
          marginTop: '0.5rem',
        }}
      >
        <Text type="p">{t('preferences.security.passwordDescription')}</Text>
      </div>
    </div>
    <Button
      label={t('preferences.security.changeYourPassword')}
      type="secondary"
      onClick={() =>
        window.location.assign(
          'https://account.buffer.com?redirect=https%3A%2F%2Fpublish.buffer.com'
        )
      }
    />
  </Row>
);

ChangePassword.propTypes = {
  t: PropTypes.func.isRequired,
};

const Security = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Text type="h2">{t('preferences.security.title')}</Text>
      <Text type="p">{t('preferences.security.addSecurity')}</Text>
      <Divider />
      <ChangePassword t={t} />
      <Divider />
      <TwoFactorAuth />
      <Divider />
    </Fragment>
  );
};

export default Security;
