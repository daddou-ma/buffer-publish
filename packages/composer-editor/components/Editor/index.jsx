import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Slate, Editable, withReact } from 'slate-react';

import styled from 'styled-components';
import { grayDarker } from '@bufferapp/ui/style/colors';
import { fontSize, fontFamily } from '@bufferapp/ui/style/fonts';

const Editor = styled(Editable)`
  color: ${grayDarker};
  padding: 8px;
  line-height: 24px;
  font-size: ${fontSize};
  font-family: ${fontFamily};
`;

const initialValue = [
  {
    children: [
      {
        text: '',
      },
    ],
  },
];

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

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        // Set the new value in the state
        setValue(newValue);
      }}
    >
      <Editor className="editor" placeholder="What would you like to share?" />
    </Slate>
  );
};

export default ComposerEditor;
