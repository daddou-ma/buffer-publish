import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@bufferapp/ui';

const listStyle = {
  padding: '0 1rem',
};

const listStyleLeft = {
  ...listStyle,
  marginRight: '1.2rem',
};

const listItemStyle = {
  marginBottom: '0.75rem',
  fontSize: '14px',
};

const getListItems = (translations) => {
  return (Object.keys(translations).forEach((key) => {
    return (
      <li style={listItemStyle} key={key}>
        <Text>{translations[key]}</Text>
      </li>
    );
  }));
};

const PlanDescriptors = translations => (
  <div>
    <div style={{ textAlign: 'center' }}>
      <Text type="h2">
        {translations.translations.plan}
      </Text>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <ul style={listStyleLeft}>
          {getListItems(translations.translations.left)}
        </ul>
      </div>
      <div style={{ flex: '1' }}>
        <ul style={listStyle}>
          {getListItems(translations.translations.right)}
        </ul>
      </div>
    </div>
  </div>
);

export default PlanDescriptors;
