import React, { useMemo, useCallback, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';

import styled from 'styled-components';
import { grayDarker } from '@bufferapp/ui/style/colors';
import { fontSize, fontFamily } from '@bufferapp/ui/style/fonts';

import EmojiPicker from '../Plugins/EmojiPicker';

const initialValue = [
  {
    children: [
      {
        text: '',
      },
    ],
  },
];

const Editor = styled(Editable)`
  color: ${grayDarker};
  padding: 8px 60px 8px 8px;
  position: relative;
  line-height: 24px;
  font-size: ${fontSize};
  font-family: ${fontFamily};
`;

/* eslint-disable react/prop-types */
const Element = props => {
  const { attributes, children, element } = props;

  switch (element.type) {
    default:
      return <p {...attributes}>{children}</p>;
  }
};
/* eslint-enable react/prop-types */

const ComposerEditor = () => {
  /**
   * This stores the value of the editor
   */
  const [value, setValue] = useState(initialValue);

  /**
   * Create the Slate editor. Each function wrapping `createEditor()` enhances
   * the object with helpers to support different things
   */
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  /**
   * Setup custom renderer for elements
   */
  const renderElement = useCallback(props => <Element {...props} />, []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        setValue(newValue);
      }}
    >
      <Editor
        className="editor"
        placeholder="What would you like to share?"
        renderElement={renderElement}
      />
      <EmojiPicker />
    </Slate>
  );
};

export default ComposerEditor;
