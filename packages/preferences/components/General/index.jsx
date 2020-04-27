import React from 'react';
import { Divider } from '@bufferapp/components';
import DateTimePreferences from '@bufferapp/date-time-preferences';
import LanguagePreferences from '@bufferapp/language-preferences';
import { Text } from '@bufferapp/ui';
import { useTranslation } from 'react-i18next';

const General = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Text type="h2">{t('preferences.general.title')}</Text>
      <Text type="p">{t('preferences.general.changePreferences')}</Text>
      <Divider />
      <DateTimePreferences />
      <LanguagePreferences />
    </React.Fragment>
  );
};

export default General;
