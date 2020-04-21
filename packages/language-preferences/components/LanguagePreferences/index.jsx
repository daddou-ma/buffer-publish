import React from 'react';
import PropTypes from 'prop-types';
import { Text, Select } from '@bufferapp/ui';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const languageLabel = locale =>
  ({
    'en-US': 'English',
    'es-ES': 'Español',
    default: 'English',
  }[locale]);

const LanguagePreferences = () => {
  const { t, i18n } = useTranslation();
  const { language } = i18n || 'en-US';

  return (
    <Wrapper>
      <Text type="h3">{t('language')}</Text>
      <Select
        hideSearch
        label={languageLabel(language)}
        onSelectClick={selectedItem => selectedItem.onItemClick()}
        items={[
          {
            title: 'English',
            selected: language === 'en-US',
            onItemClick: () => i18n.changeLanguage('en-US'),
          },
          {
            title: 'Español',
            selected: language === 'es-ES',
            onItemClick: () => i18n.changeLanguage('es-ES'),
          },
        ]}
      />
    </Wrapper>
  );
};

LanguagePreferences.propTypes = {
  initialValues: PropTypes.shape({
    locale: PropTypes.string,
    language: PropTypes.string,
  }).isRequired,
};

export default LanguagePreferences;
