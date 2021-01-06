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

const getListItems = list => {
  return Object.keys(list).map(key => (
    <li style={listItemStyle} key={key}>
      <Text>{list[key]}</Text>
    </li>
  ));
};

const PlanDescriptors = ({ left, right, plan }) => (
  <div>
    <div style={{ textAlign: 'center' }}>
      <Text type="h2">{plan}</Text>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '1' }}>
        <ul style={listStyleLeft}>{getListItems(left)}</ul>
      </div>
      <div style={{ flex: '1' }}>
        <ul style={listStyle}>{getListItems(right)}</ul>
      </div>
    </div>
  </div>
);

PlanDescriptors.propTypes = {
  left: PropTypes.object.isRequired, // eslint-disable-line
  right: PropTypes.object.isRequired, // eslint-disable-line
  plan: PropTypes.string.isRequired,
};

export default PlanDescriptors;
