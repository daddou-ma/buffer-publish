import React from 'react';

const proTagStyle = {
  width: '40px',
  height: '16px',
  background: '#87C221',
  borderRadius: '23px',
  textAlign: 'center',
  lineHeight: '13px',
  display: 'table-cell',
  verticalAlign: 'middle',
};

const proTagSpanStyle = {
  fontWeight: 'bold',
  fontSize: '11px',
  color: 'white',
};

export default () => (
  <div style={proTagStyle}>
    <span style={proTagSpanStyle}>PRO</span>
  </div>
);
