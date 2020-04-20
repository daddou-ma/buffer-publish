import React from 'react';
import PropTypes from 'prop-types';
import { Text, Select } from '@bufferapp/ui';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LanguagePreferences = ({ initialValues, onSelectLanguage }) => (
  <Wrapper>
    <Text type="h3">Language</Text>
    <Select
      hideSearch
      label={initialValues.language}
      onSelectClick={selectedItem => selectedItem.onItemClick()}
      items={[
        {
          title: 'English',
          selected: initialValues.locale === 'en-US',
          onItemClick: () => onSelectLanguage('en-US'),
        },
        {
          title: 'Español',
          selected: initialValues.locale === 'es-ES',
          onItemClick: () => onSelectLanguage('es-ES'),
        },
      ]}
    />
  </Wrapper>
);

LanguagePreferences.propTypes = {
  initialValues: PropTypes.shape({
    locale: PropTypes.string,
    language: PropTypes.string,
  }).isRequired,
  onSelectLanguage: PropTypes.func.isRequired,
};

export default LanguagePreferences;
