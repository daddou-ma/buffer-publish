import React from 'react';
import { blue, redLight } from '@bufferapp/ui/style/colors';

const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      css={`
        color: ${leaf.highlighted && blue};
        background-color: ${leaf.overCharLimit && redLight};
      `}
    >
      {children}
    </span>
  );
};

export default Leaf;
