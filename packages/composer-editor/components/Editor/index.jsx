import React, { useMemo, useCallback, useState } from 'react';
import { Text, createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';

import styled from 'styled-components';
import { grayDarker } from '@bufferapp/ui/style/colors';
import { fontSize, fontFamily } from '@bufferapp/ui/style/fonts';

import Leaf from '../Leaf';
import EmojiPicker from '../plugins/EmojiPicker';

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

  /**
   * Setup custom renderer for each leaf. Characters are grouped into "leaves" of text
   * that each contain the same formatting applied to them.
   */
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const decorate = useCallback(
    ([node, path]) => {
      const ranges = [];
      const charLimit = 20; // Temporary static data
      const { text } = node;

      if (!Text.isText(node)) {
        return ranges;
      }
      // Add text decorator after reaching characters limit
      if (text.length > charLimit) {
        ranges.push({
          overCharLimit: true,
          anchor: { path, offset: charLimit },
          focus: { path, offset: text.length },
        });
      }

      return ranges;
    },
    [value]
  );

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
        renderLeaf={renderLeaf}
        decorate={decorate}
      />
      <EmojiPicker />
    </Slate>
  );
};

export default ComposerEditor;
