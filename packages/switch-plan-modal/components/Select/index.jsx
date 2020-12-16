import React from 'react';
import PropTypes from 'prop-types';

import { Text } from '@bufferapp/ui';
import { fontFamily, fontSize } from '@bufferapp/ui/style/fonts';
import { redDark, gray } from '@bufferapp/ui/style/colors';
import { borderRadius } from '@bufferapp/ui/style/borders';
import { borderWidth } from '@bufferapp/components/style/border';

const formLabelStyle = {
  display: 'block',
  padding: '0 0 0.25rem 0',
};

const ERROR = 'Required field';

const getBorderColor = hasError => {
  if (hasError) return redDark;

  return gray;
};

const getSelectStyle = hasError => ({
  fontFamily,
  fontSize,
  padding: '0.5rem',
  borderRadius,
  border: `${borderWidth} solid ${getBorderColor(hasError)}`,
  width: '100%',
  boxSizing: 'border-box',
  height: '37px',
});

const Select = ({ id, children, label, store, hasError }) => (
  <div>
    <label htmlFor={id} style={formLabelStyle}>
      <Text type="label">{label}</Text>
    </label>
    <select
      name={id}
      id={id}
      style={getSelectStyle(hasError)}
      onChange={ev => store(id, ev.target.value)}
    >
      {children}
    </select>
    {hasError && (
      <Text hasError type="help">
        {ERROR}
      </Text>
    )}
  </div>
);

Select.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  store: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
};

Select.defaultProps = {
  hasError: false,
};

export default Select;
