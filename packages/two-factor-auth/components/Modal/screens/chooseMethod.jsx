import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';

const ChooseMethod = ({ transition, setupApp, loading, editMode }) => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {loading && <Text size="large">{t('common.pleaseWait')}</Text>}
      <div style={{ display: loading ? 'none' : 'block' }}>
        <div style={{ textAlign: 'center' }}>
          <Text type="h3">
            {!editMode && t('preferences.security.enableTwoFactor')}
            {editMode && t('preferences.security.changeTwoFactor')}
          </Text>
          <div style={{ margin: '12px 0' }}>
            <Text type="p">{t('preferences.security.sendSecutiryCodes')}</Text>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, padding: '8px' }}>
            <Button
              type="secondary"
              fullWidth
              label={t('preferences.security.textMessage')}
              onClick={() => transition('CHOOSE_SMS')}
            />
          </div>
          <div style={{ flex: 1, padding: '8px' }}>
            <Button
              type="secondary"
              fullWidth
              label={t('preferences.security.authenticatorApp')}
              onClick={setupApp}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

ChooseMethod.propTypes = {
  transition: PropTypes.func.isRequired,
  setupApp: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default ChooseMethod;
