import React from 'react';

const Element = ({ attributes, children, element = {} }) => {
  switch (element.type) {
    default:
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <p {...attributes}>{children}</p>;
  }
};

export default Element;
