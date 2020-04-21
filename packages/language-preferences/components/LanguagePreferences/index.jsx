import React from 'react';
import PropTypes from 'prop-types';
import { Text, Select } from '@bufferapp/ui';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import languageLabel from '../../utils';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LanguagePreferences = ({ onSelectLanguage }) => {
  const { t, i18n } = useTranslation();
  const { language = 'en-US' } = i18n;

  const changeLanguage = locale => {
    i18n.changeLanguage(locale);
    onSelectLanguage(locale);
  };

  return (
    <Wrapper>
      <Text type="h3">{t('language')}</Text>
      <Select
        hideSearch
        label={languageLabel(language)}
        onSelectClick={selectedItem => selectedItem.onItemClick()}
        items={[
          {
            title: languageLabel('en-US'),
            selected: language === 'en-US',
            onItemClick: () => changeLanguage('en-US'),
          },
          {
            title: languageLabel('es-ES'),
            selected: language === 'es-ES',
            onItemClick: () => changeLanguage('es-ES'),
          },
        ]}
      />
    </Wrapper>
  );
};

LanguagePreferences.propTypes = {
  onSelectLanguage: PropTypes.func.isRequired,
};

export default LanguagePreferences;
