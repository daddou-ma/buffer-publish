import React from 'react';
import { redLight } from '@bufferapp/ui/style/colors';

const Leaf = ({ attributes, children, leaf }) => {
  return (
    <span
      {...attributes}
      css={`
        background-color: ${leaf.overCharLimit && redLight};
      `}
    >
      {children}
    </span>
  );
};

export default Leaf;
