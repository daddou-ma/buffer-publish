import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Text } from '@bufferapp/ui';
import { Row } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

const TimeFormatPreferences = () => {
  const { t } = useTranslation();

  return (
    <Row>
      <Text type="h3">{t('preferences.general.timeFormat')}</Text>
      <form>
        <Field
          component="input"
          type="radio"
          id="twelveHourFormat"
          name="format"
          value="12"
        />
        <label htmlFor="twelveHourFormat" style={{ marginRight: '.5rem' }}>
          <Text type="label">12 {t('preferences.general.hour')}</Text>
        </label>
        <Field
          component="input"
          type="radio"
          id="twentyFourHourFormat"
          name="format"
          value="24"
        />
        <label htmlFor="twentyFourHourFormat">
          <Text type="label">24 {t('preferences.general.hour')}</Text>
        </label>
      </form>
    </Row>
  );
};

export default reduxForm({
  form: 'time-format-preferences',
})(TimeFormatPreferences);
