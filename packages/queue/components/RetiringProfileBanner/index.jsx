import React from 'react';
import { Text } from '@bufferapp/ui';
import { ErrorBanner } from '@bufferapp/publish-shared-components';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const StyledText = styled(Text)`
  margin: 0;
`;

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
      <StyledText type="p">{t('retiring-profile-banner.body')}</StyledText>
    </ErrorBanner>
  );
};

export default RetiringProfileBanner;
