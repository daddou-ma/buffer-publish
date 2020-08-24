import React from 'react';
import { Text } from '@bufferapp/ui';
import { ErrorBanner } from '@bufferapp/publish-shared-components';
import { useTranslation } from 'react-i18next';

const RetiringProfileBanner = () => {
  const { t } = useTranslation();
  const supportURL =
    'https://support.buffer.com/hc/en-us/articles/360052978413-Deprecating-Instagram-Personal-Profiles';
  return (
    <ErrorBanner
      title={t('retiring-profile-banner.title')}
      onClick={() => window.location.assign(supportURL)}
      actionLabel={t('retiring-profile-banner.action')}
    >
      <Text>{t('retiring-profile-banner.body')}</Text>
    </ErrorBanner>
  );
};

export default RetiringProfileBanner;
