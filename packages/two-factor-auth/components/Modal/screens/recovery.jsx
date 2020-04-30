import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { AutoSelectText } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

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
}) => {
  const { t } = useTranslation();

  return (
    <div style={wrapperStyle}>
      <Text type="h3">
        {editMode && t('preferences.security.yourRecoveryCode')}
        {!editMode && t('preferences.security.saveOneTimeCode')}
      </Text>
      <div>
        <Text type="p">
          {t('preferences.security.recoveryCodeDescription')}
        </Text>
      </div>
      <AutoSelectText onSelect={handleRecoveryCodeSelect} copyToClipboard>
        {loading ? t('common.pleaseWait') : recoveryCode}
      </AutoSelectText>

      <div style={{ alignSelf: 'flex-end', marginTop: '16px' }}>
        <Button
          type="primary"
          label={t('common.done')}
          onClick={() => transition('CLOSE')}
        />
      </div>
    </div>
  );
};

Recovery.propTypes = {
  transition: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  handleRecoveryCodeSelect: PropTypes.func.isRequired,
  recoveryCode: PropTypes.string.isRequired,
};

export default Recovery;
